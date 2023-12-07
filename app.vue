<script setup>
import { format } from "date-fns";
const pacesGenerator = () => {
  // generate an array of paces from WR pace (4:36) to race time cutoff 16 min incrementing by 5 seconds
  // TODO: dynamic time range inputs
  const initial = (secs) => new Date(0, 0, 0, 0, 4, 35 + secs);
  // TODO: dynamic time range inputs
  const slowest = new Date(0, 0, 0, 0, 16, 5);
  const diff = slowest.getTime() - initial(0).getTime();
  const seconds = diff / 1000;
  let pacesArr = [];
  // TODO: dynamic time interval input
  for (let i = 0; i < seconds; i += 5) {
    pacesArr.push(format(initial(i), "H:mm:ss"));
  }
  return pacesArr;
};
const paces = ref(pacesGenerator());

const mileMarkerGenerator = () => {
  // generate splits from 1-26 of each pace. push in 5k, 10k, half m, and full m splits
  return [
    1, 2, 3, 3.1, 4, 5, 6, 6.2, 7, 8, 9, 10, 11, 12, 13, 13.1, 14, 15, 16, 17,
    18, 19, 20, 21, 22, 23, 24, 25, 26, 26.2,
  ];
};
const mileMarkers = ref(mileMarkerGenerator());

const splitsGenerator = () => {
  const splits = [];

  paces.value.forEach((pace) => {
    let timeArr = pace.toString().split(":");
    let miliSeconds =
      (+timeArr[0] * 60 * 60 + +timeArr[1] * 60 + +timeArr[2]) * 1000;
    const multipliedValues = mileMarkers.value.map((mile) =>
      format(
        new Date(0, 0, 1, 0, 0, 0, miliSeconds * mile),
        new Date(0, 0, 1, 0, 0, 0, miliSeconds * mile) <
          new Date(0, 0, 1, 1, 0, 0, 0)
          ? "m:ss"
          : "H:mm:ss"
      )
    );
    splits.push(multipliedValues);
  });

  return splits;
};

const allSplits = ref(splitsGenerator());
</script>

<template>
  <div class="my-6 text-2xl font-bold">
    <div
      v-for="splits in allSplits"
      class="flex flex-auto inline-flex hover:bg-green-200 transition ease-in-out delay-150 hover:-translate-y-1"
    >
      <div
        v-for="split in splits"
        class="flex flex-none justify-center items-center h-20 cell-width text-center grow w-28 border p-2"
      >
        {{ split }}
      </div>
    </div>
  </div>
</template>
