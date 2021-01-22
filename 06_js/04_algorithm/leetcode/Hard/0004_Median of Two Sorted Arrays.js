/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const findMedianSortedArrays = (nums1, nums2) => {
  const NUMBERS = [...nums1, ...nums2].sort((a, b) => a - b);
  const MID_IDX = parseInt(NUMBERS.length / 2);
  return NUMBERS.length % 2 === 0 ? (NUMBERS[MID_IDX - 1] + NUMBERS[MID_IDX]) / 2 : NUMBERS[MID_IDX];
};
