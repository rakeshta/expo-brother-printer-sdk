import { StyleSheet } from 'react-native';

const Brand = {
  Primary: '#6224DB',
  Secondary: '#9DDB24',
};

const Surface = {
  Primary: '#FFFFFF',
  Secondary: '#F0F0F0',
  Tertiary: '#D5D5D5',
} as const;

const Separator = {
  Primary: '#CCCCCC',
  Secondary: '#E0E0E0',
} as const;

const Content = {
  Primary: '#141414',
  Secondary: '#797979',
  Tertiary: '#a9a9a9',
  Reverse: '#EAEAEA',
} as const;

/** Theme colors */
export const Color = {
  Brand,
  Surface,
  Separator,
  Content,
} as const;

export const colors = StyleSheet.create({
  bg_brand_primary: { backgroundColor: Color.Brand.Primary },
  bg_brand_secondary: { backgroundColor: Color.Brand.Secondary },

  bg_surface_primary: { backgroundColor: Color.Surface.Primary },
  bg_surface_secondary: { backgroundColor: Color.Surface.Secondary },
  bg_surface_tertiary: { backgroundColor: Color.Surface.Tertiary },

  bg_separator_primary: { backgroundColor: Color.Separator.Primary },
  bg_separator_secondary: { backgroundColor: Color.Separator.Secondary },

  border_primary: { borderColor: Color.Separator.Primary },
  border_secondary: { borderColor: Color.Separator.Secondary },

  color_text_primary: { color: Color.Content.Primary },
  color_text_secondary: { color: Color.Content.Secondary },
  color_text_tertiary: { color: Color.Content.Tertiary },
  color_text_reverse: { color: Color.Content.Reverse },
});
