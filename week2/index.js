var nums = [5, 10, 15];

function addAll() {
  var total = 0;
  var i;

  for (i = 0; i < nums.length; i++) {
    total += nums[i];
  }

  return total;
}

var result = addAll();
console.log(result);