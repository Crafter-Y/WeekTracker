import { View, StyleProp, ViewStyle, TextStyle, Pressable } from "react-native";
import WeekView, { WeekViewEvent } from "react-native-week-view";
import moment from "moment";
import { useEffect, useState } from "react";
import { Store } from "../../helpers/store";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import HeaderButton from "../../components/HeaderButton";

const createFixedWeekDate = (
  day: string | number,
  hours: number,
  minutes = 0,
  seconds = 0
) => {
  const date = moment();
  date.isoWeekday(day);
  date.hours(hours);
  date.minutes(minutes);
  date.seconds(seconds);
  return date.toDate();
};

interface UntypedWeekViewEvent {
  id: number;
  description: string;
  startDate: Date;
  endDate: Date;
  eventKind?: "block" | "standard";
  resolveOverlap?: "stack" | "lane" | "ignore";
  stackKey?: string;
  color: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disableDrag?: boolean;
  disablePress?: boolean;
  disableLongPress?: boolean;
}

const createTypedEvent = (arr: UntypedWeekViewEvent[]): WeekViewEvent[] => {
  return arr.map((entry) => {
    return {
      id: entry.id,
      description: entry.description,
      startDate: entry.startDate,
      endDate: entry.endDate,
      eventKind: entry.eventKind ?? "standard",
      resolveOverlap: entry.resolveOverlap ?? "lane",
      stackKey: entry.stackKey ?? entry.id + "",
      color: entry.color,
    };
  });
};

const testEvents: UntypedWeekViewEvent[] = [
  {
    id: 1,
    description: "Event 1",
    startDate: createFixedWeekDate("Monday", 12), // Day may be passed as string
    endDate: createFixedWeekDate(1, 14), // Or as number, 1 = monday
    color: "red",
  },
  {
    id: 2,
    description: "Event 2",
    startDate: createFixedWeekDate("wed", 16),
    endDate: createFixedWeekDate(3, 16, 30),
    color: "green",
  },
  {
    id: 3,
    description: "Event 2",
    startDate: createFixedWeekDate("wed", 17),
    endDate: createFixedWeekDate(3, 17, 30),
    color: "green",
  },
];

export default function HomeScreen() {
  const [events, setEvents] = useState<WeekViewEvent[]>([]);
  const [editingEventId, setEditEventId] = useState<number | undefined>();
  const draggingEnabled = Store.useState((state) => state.draggingEnabled);

  useEffect(() => {
    setEvents(createTypedEvent(testEvents));
  }, []);

  const editEvent = (
    event: WeekViewEvent,
    newStartDate: Date,
    newEndDate: Date
  ) => {
    setEvents([
      ...events.filter((e) => e.id !== event.id),
      {
        ...event,
        startDate: newStartDate,
        endDate: newEndDate,
      },
    ]);
  };

  return (
    <SafeAreaView
      className="w-full h-full"
      style={{ height: "100%", width: "100%" }}
    >
      <Header
        title="13.11.2023 - 19.11.2023"
        headerRight={<HeaderButton icon="navicon" link="/modal" />}
      />
      <WeekView
        events={events}
        fixedHorizontally={true}
        showTitle={false}
        numberOfDays={7}
        formatDateHeader="ddd"
        // @ts-ignore
        pageStartAt={{ weekday: 1 }}
        selectedDate={new Date()}
        headerTextStyle={{ color: "white" }}
        hourTextStyle={{ color: "white" }}
        hoursInDisplay={12}
        showNowLine={true}
        nowLineColor={"orange"}
        timesColumnWidth={0.1}
        onDragEvent={
          draggingEnabled
            ? (event, newStartDate, newEndDate) => {
                editEvent(event, newStartDate, newEndDate);
              }
            : undefined
        }
        editEventConfig={{ top: true, right: false, bottom: true, left: false }}
        editingEvent={editingEventId}
        onEditEvent={(event, newStartDate, newEndDate) => {
          editEvent(event, newStartDate, newEndDate);
        }}
        onEventLongPress={(event) => {
          if (editingEventId == undefined) {
            setEditEventId(event.id);
          } else {
            setEditEventId(undefined);
          }
        }}
        onGridClick={() => {
          if (editingEventId != undefined) {
            setEditEventId(undefined);
          }
        }}
        onEventPress={() => {
          if (editingEventId != undefined) {
            setEditEventId(undefined);
          }
        }}
      />
    </SafeAreaView>
  );
}
