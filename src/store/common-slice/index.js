import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
("");
const initialState = {
  isLoading: false,
  featureImageList: [
    {
      image: "https://cmsimages.shoppersstop.com/Levis_web_2d724aab25/Levis_web_2d724aab25.png",
    },
    {
      image: "https://cmsimages.shoppersstop.com/Puma_web_fd5eb32ca8/Puma_web_fd5eb32ca8.png",
    },
    {
      image: "https://cmsimages.shoppersstop.com/static_web_d107367fe0/static_web_d107367fe0.png",
    },
    {
      image: "https://cmsimages.shoppersstop.com/women_western_main_web_3564434e7b/women_western_main_web_3564434e7b.png",
    },
  ],
};


export const getFeatureImages = createAsyncThunk(
  "/order/getFeatureImages",
  async () => {
    const response = await axios.get(
      `http://localhost:5000/api/common/feature/get`
    );

    return response.data;
  }
);

export const addFeatureImage = createAsyncThunk(
  "/order/addFeatureImage",
  async (image) => {
    const response = await axios.post(
      `http://localhost:5000/api/common/feature/add`,
      { image }
    );

    return response.data;
  }
);

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        

        state.featureImageList = [
          // {
          //   image:
          //     "https://assets.ajio.com/cms/AJIO/WEB/D-FCS-WHP-1.0-S2-TOPBANNER-P1-5090-24072025.jpg",
          // },
          {
            image:
              "https://cmsimages.shoppersstop.com/Levis_web_2d724aab25/Levis_web_2d724aab25.png",
          },
          {
            image:
              "https://cmsimages.shoppersstop.com/Puma_web_fd5eb32ca8/Puma_web_fd5eb32ca8.png",
          },
          {
            image:
              "https://cmsimages.shoppersstop.com/static_web_d107367fe0/static_web_d107367fe0.png",
          },
          {
            image:
              "https://cmsimages.shoppersstop.com/women_western_main_web_3564434e7b/women_western_main_web_3564434e7b.png",
          },
        ];
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;

        state.featureImageList = [
          {
            image: "https://cmsimages.shoppersstop.com/Levis_web_2d724aab25/Levis_web_2d724aab25.png",
          },
          {
            image: "https://cmsimages.shoppersstop.com/Puma_web_fd5eb32ca8/Puma_web_fd5eb32ca8.png",
          },
          {
            image: "https://cmsimages.shoppersstop.com/static_web_d107367fe0/static_web_d107367fe0.png",
          },
          {
            image: "https://cmsimages.shoppersstop.com/women_western_main_web_3564434e7b/women_western_main_web_3564434e7b.png",
          },
        ];
      });
  },
});

export default commonSlice.reducer;
