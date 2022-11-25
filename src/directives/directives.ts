const pv = (el: any, binding: any) => {
  console.log(binding.value);
  console.log(el);
};

const directives: any = {
  pv,
};

export default directives;
