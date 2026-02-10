import { IMAGES } from "@/constants/images";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  testmonials: [
    {
      id: 1,
      image: IMAGES.TESTIMONIAL.IMAGE_1,
      name: "Sarah Thompson",
      country: "New York, USA",
      desc: "StyleLoom exceeded my expectations. The gown's quality and design made me feel like a queen. Fast shipping, too! ",
    },
    {
      id: 2,
      image: IMAGES.TESTIMONIAL.IMAGE_2,
      name: "Rajesh Patel",
      country: "Mumbai, India",
      desc: "Absolutely love the style and warmth of the jacket. A perfect blend of fashion and functionality!",
    },
    {
      id: 3,
      image: IMAGES.TESTIMONIAL.IMAGE_3,
      name: "Emily Walker",
      country: "London, UK",
      desc: "Adorable and comfortable! My daughter loves her new outfit. Thank you, StyleLoom, for dressing our little fashionista.",
    },
    {
      id: 4,
      image: IMAGES.TESTIMONIAL.IMAGE_4,
      name: "Alejandro Martinez",
      country: "Barcelona, Spain",
      desc: "Impressed by the quality and style. These shoes turned heads at every event. StyleLoom, you've gained a loyal customer!",
    },
    {
      id: 5,
      image: IMAGES.TESTIMONIAL.IMAGE_5,
      name: "Priya Sharma",
      country: "Delhi, India",
      desc: "Perfect fit and exceptional quality. These jeans have become my go-to for casual and chic outings.",
    },
    {
      id: 6,
      image: IMAGES.TESTIMONIAL.IMAGE_6,
      name: "Rodriguez",
      country: "Mexico City, Mexico",
      desc: "Stylish sneakers that don't compromise on comfort. StyleLoom knows how to balance fashion and functionality.",
    },
  ],
};
const testmonialsSlice = createSlice({
  name: "testmonials",
  initialState,
  reducers: {},
});

export default testmonialsSlice.reducer;
