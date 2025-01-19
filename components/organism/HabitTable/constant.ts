import { habitData } from "./types";

const generateDates = (days) => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push(date.toISOString().split("T")[0]);
  }
  return dates;
};

const dates = generateDates(3);

const dummyHabitData: habitData[] = [
  {
    name: "Walk 10,000 steps",
    key: "1",
    measurable: true,
    color: "rose",
    id: "1",
    createdAt: dates[2],
    value: [
      {
        date: dates[2],
        value: "10k",
        note: "Great start to the year!",
      },
      {
        date: dates[1],
        value: "9.5k",
        note: "Almost hit the target.",
      },
      {
        date: dates[0],
        value: "11k",
        note: "Exceeded the target!",
      },
    ],
  },
  {
    name: "Read for 30 minutes",
    measurable: true,
    key: "1",
    color: "green",
    id: "2",
    createdAt: dates[2],
    value: [
      {
        date: dates[2],
        value: 30,
        note: "Read a chapter of a book.",
      },
      {
        date: dates[1],
        value: 25,
        note: "Almost finished the chapter.",
      },
      {
        date: dates[0],
        value: 35,
        note: "Finished the chapter and started a new one.",
      },
    ],
  },
  {
    name: "Drink 8 glasses of water",
    measurable: true,
    color: "yellow",
    key: "1",
    id: "3",
    createdAt: dates[2],
    value: [
      {
        date: dates[2],
        value: 8,
        note: "Met the daily water intake goal.",
      },
      {
        date: dates[1],
        value: 7,
        note: "Almost met the goal.",
      },
      {
        date: dates[0],
        value: 9,
        note: "Exceeded the goal.",
      },
    ],
  },
  {
    name: "Meditate for 15 minutes",
    measurable: true,
    color: "purple",
    key: "1",
    id: "4",
    createdAt: dates[2],
    value: [
      {
        date: dates[2],
        value: 15,
        note: "Felt very relaxed.",
      },
      {
        date: dates[1],
        value: 10,
        note: "Had a shorter session.",
      },
      {
        date: dates[0],
        value: 20,
        note: "Had a longer session.",
      },
    ],
  },
];

export default dummyHabitData;
