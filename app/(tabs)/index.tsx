import { StyleProp, ViewStyle, TextStyle } from "react-native";
import WeekView, { WeekViewEvent } from "react-native-week-view";
import moment from "moment";
import { useEffect, useState } from "react";
import { Store } from "../../helpers/store";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import HeaderButton from "../../components/HeaderButton";
import { v4 as uuidv4 } from "uuid";

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

const createTypedEvents = (arr: UntypedWeekViewEvent[]): WeekViewEvent[] => {
  return arr.map((entry) => {
    return createTypedEvent(entry);
  });
};

const createTypedEvent = (entry: UntypedWeekViewEvent): WeekViewEvent => {
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
  {
    id: 4,
    description: "Event 2",
    startDate: createFixedWeekDate("tue", 17),
    endDate: createFixedWeekDate(2, 17, 30),
    color: "green",
  },
  {
    id: 5,
    description: "Event 2",
    startDate: createFixedWeekDate("thu", 17),
    endDate: createFixedWeekDate(4, 17, 30),
    color: "green",
  },
  {
    id: 6,
    description: "Event 2",
    startDate: createFixedWeekDate("fri", 17),
    endDate: createFixedWeekDate(5, 17, 30),
    color: "green",
  },
  {
    id: 7,
    description: "Event 2",
    startDate: createFixedWeekDate("sat", 17),
    endDate: createFixedWeekDate(6, 17, 30),
    color: "green",
  },
  {
    id: 8,
    description: "Event 2",
    startDate: createFixedWeekDate("sun", 17),
    endDate: createFixedWeekDate(7, 17, 30),
    color: "green",
  },
];

export default function HomeScreen() {
  const [events, setEvents] = useState<WeekViewEvent[]>([]);
  const [editingEventId, setEditEventId] = useState<number | undefined>();
  const draggingEnabled = Store.useState((state) => state.draggingEnabled);

  useEffect(() => {
    setEvents(createTypedEvents(testEvents));
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
        headerRight={<HeaderButton icon="navicon" link="/homeOptions" />}
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
        onGridLongPress={(pressEvent, startHour, date) => {
          let mDate = moment(date).startOf("minute");
          if (mDate.get("minutes") < 15) {
            mDate = mDate.subtract(mDate.get("minutes"), "minutes");
          } else if (mDate.get("minutes") < 30) {
            mDate = mDate.add(30 - mDate.get("minutes"), "minutes");
          } else if (mDate.get("minutes") < 45) {
            mDate = mDate.subtract(mDate.get("minutes") - 30, "minutes");
          } else {
            mDate = mDate.add(60 - mDate.get("minutes"), "minutes");
          }

          let fromHour = mDate.get("hour");

          let toHour;
          if (fromHour > 22) {
            toHour = 23;
          } else {
            toHour = fromHour + 1;
          }

          let weekday = mDate.get("weekday") == 0 ? 7 : mDate.get("weekday");

        
          setEvents([
            ...events,
            createTypedEvent({
              id: Math.random(),
              description: "New Event",
              startDate: createFixedWeekDate(
                weekday,
                fromHour,
                mDate.get("minutes")
              ),
              endDate: createFixedWeekDate(weekday, toHour, 59),
              color: "green",
            }),
          ]);
        }}
      />
    </SafeAreaView>
  );
}
