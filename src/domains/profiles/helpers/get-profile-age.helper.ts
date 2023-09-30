import moment from 'moment';

function getApproximateProfileAge(age: number | null) {
  return age
    ? `~ ${moment().from(moment().subtract(age, 'years'), true)}`
    : null;
}

export { getApproximateProfileAge };
