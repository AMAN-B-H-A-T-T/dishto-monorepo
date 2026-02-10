export interface Page {
  id: string;
  path: string;
  name: string;
}

export interface SliderImage {
  image: string;
  order: number;
}

export interface OutletInfo {
  name: string;
  slug: string;
  cover_image?: string;
  mid_page_slider?: SliderImage[];
}

export interface UserInfo {
  email: string;
  name: string | null;
  ph_no: string | null;
  role: string;
  slug: string;
  extras: {
    outlet: OutletInfo;
  };
}
