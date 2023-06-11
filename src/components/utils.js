import _ from "lodash";

export const getOptions = (valuesArray, key) => {
  return _.reduce(
    valuesArray,
    (acc, curr) => {
      acc.push({
        value: curr,
        label: _.capitalize(_.kebabCase(curr).replace("-", " ")),
        key,
      });
      return acc;
    },
    []
  );
};

export const getFilteredResults = (data, filters, freeSearch) => {
  const keysFilterd = _.groupBy(filters, "key");
  const objectFilters = _.reduce(
    filters,
    (acc, filter) => {
      if (acc[filter.key]) {
        acc[filter.key].add(filter.value);
      } else {
        acc[filter.key] = new Set([filter.value]);
      }
      return acc;
    },
    {}
  );

  const returnedItems = _.filter(data, (item) => {
    return (
      _.every(_.keys(keysFilterd), (key) => {
        return objectFilters[key].has(item[key]);
      }) &&
      (!freeSearch ||
        JSON.stringify(_.values(item))
          .toLowerCase()
          .includes(freeSearch.toLowerCase()))
    );
  });

  return returnedItems;
};

export const formatTime = (time) => {
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Date(time).toDateString();
};
