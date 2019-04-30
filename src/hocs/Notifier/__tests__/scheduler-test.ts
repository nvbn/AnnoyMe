import { parse } from "date-fns";
import { getDatesToSchedule, removePast } from "../scheduler";

it("getDatesToSchedule returns dates range", () => {
  const from = parse("2019-01-01 00:00:00");
  const dates = getDatesToSchedule(from, 1, 30, 10, 16);

  const expected = [
    "2019-01-01 10:01:00",
    "2019-01-01 10:31:00",
    "2019-01-01 11:01:00",
    "2019-01-01 11:31:00",
    "2019-01-01 12:01:00",
    "2019-01-01 12:31:00",
    "2019-01-01 13:01:00",
    "2019-01-01 13:31:00",
    "2019-01-01 14:01:00",
    "2019-01-01 14:31:00",
    "2019-01-01 15:01:00",
    "2019-01-01 15:31:00",
    "2019-01-01 16:01:00",
    "2019-01-01 16:31:00",
  ].map(x => parse(x));

  expect(dates).toEqual(expected);
});

it("removePast removes past dates", () => {
  const now = parse("2019-01-01 01:00:00");

  const delay = 2;

  const dates = [
    "2019-01-01 00:00:00",
    "2019-01-01 01:00:00",
    "2019-01-01 01:01:00",
    "2019-01-01 02:00:00",
    "2019-01-02 01:00:00",
  ].map(x => parse(x));

  const withoutPast = removePast(now, delay, dates);

  const expected = ["2019-01-01 02:00:00", "2019-01-02 01:00:00"].map(x =>
    parse(x),
  );

  expect(withoutPast).toEqual(expected);
});
