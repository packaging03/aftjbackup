import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
const {width, height} = Dimensions.get('window');
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryGroup,
  VictoryAxis,
} from 'victory-native';

const Chart = () => {
  const data1 = [
    {day: 'Mon', time: 1},
    {day: 'Tus', time: 3},
    {day: 'Wed', time: 2},
    {day: 'Thus', time: 10},
    {day: 'Fri', time: 1},
    {day: 'Sat', time: 5},
    {day: 'Sun', time: 4},
  ];
  const barW = 25;
  const red = 'red';
  return (
    <View>
      <VictoryChart
        height={height / 4}
        theme={VictoryTheme.material}
        domainPadding={20}>
        <VictoryAxis
          tickValues={[1, 2, 3, 4]}
          tickFormat={['Mon', 'Tus', 'Wed', 'Thus', 'Fri', 'Sat', 'Sun']}
        />
        <VictoryAxis dependentAxis tickFormat={x => `${x}hr`} />
        <VictoryBar
          data={data1}
          x="day"
          y="time"
          barWidth={barW}
          style={{data: {fill: red}}}
        />
      </VictoryChart>

      {/* ================================================================= */}

      <VictoryChart height={height / 4} theme={VictoryTheme.material}>
        <VictoryAxis
          tickValues={[1, 2, 3, 4]}
          tickFormat={['6pm', '12pm', '6pm', '12pm']}
        />
        <VictoryAxis dependentAxis tickFormat={x => `${x}m`} />
        <VictoryGroup animate={true} offset={4} colorScale="red">
          <VictoryBar
            data={[
              {x: 1, y: 1},
              {x: 2, y: 2},
              {x: 3, y: 5},
              {x: 4, y: 2},
              {x: 3, y: 6},
            ]}
          />
          <VictoryBar
            data={[
              {x: 1, y: 1},
              {x: 2, y: 2},
              {x: 3, y: 5},
              {x: 4, y: 2},
              {x: 3, y: 4},
            ]}
          />
          <VictoryBar
            data={[
              {x: 1, y: 2},
              {x: 2, y: 1},
              {x: 3, y: 2},
              {x: 4, y: 5},
              {x: 3, y: 2},
            ]}
          />
          <VictoryBar
            data={[
              {x: 1, y: 3},
              {x: 2, y: 4},
              {x: 3, y: 6},
              {x: 4, y: 4},
              {x: 3, y: 6},
            ]}
          />
          <VictoryBar
            data={[
              {x: 1, y: 3},
              {x: 2, y: 4},
              {x: 3, y: 2},
              {x: 4, y: 4},
              {x: 3, y: 6},
            ]}
          />
          <VictoryBar
            data={[
              {x: 1, y: 3},
              {x: 2, y: 4},
              {x: 2, y: 2},
              {x: 3, y: 5},
              {x: 3, y: 6},
            ]}
          />
        </VictoryGroup>
      </VictoryChart>
    </View>
  );
};

export default Chart;

const styles = StyleSheet.create({});