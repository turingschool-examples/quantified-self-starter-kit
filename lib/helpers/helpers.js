/* @flow */

const remainingCalSign = (num: number): string => {
  return num >= 0 ? 'positive' : 'negative';
}

module.exports = {remainingCalSign}
