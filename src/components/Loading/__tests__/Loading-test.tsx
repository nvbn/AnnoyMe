import React from "react";
import renderer from "react-test-renderer";
import Loading from "../Loading";

it("Loading shows loading message", () => {
  const tree = renderer.create(<Loading />).toJSON();

  expect(tree).toMatchSnapshot("Loading-shows-message");
});
