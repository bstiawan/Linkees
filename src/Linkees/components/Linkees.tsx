import React from 'react';
import Header from './components/Header';
import Card from './components/Card';
import Footer from './components/Footer';

import { ItemType } from '../ts';

import { CHANNEL_TYPE_VS_COVER_IMAGE } from './constant';
import { CHANNEL_TYPES } from '../constants';

function Linkees({
  headerAvatar,
  cardItems,
  name,
}: {
  headerAvatar?: string;
  cardItems: ItemType[];
  name: string;
}): JSX.Element {
  // For default section, all items are default
  // For other sections, only the last 2 items (concatenated default items) are default
  const defaultItemsCount = name === 'default' ? cardItems.length : 2;

  return (
    <div className="App">
      <Header avatar={headerAvatar} name={name} />
      <div className="container row">
        {cardItems.map((item, i: number) => {
          // Ensure we get a string type for coverImage
          const coverImage = (item.image ??
            (typeof CHANNEL_TYPE_VS_COVER_IMAGE[item.type] === 'string'
              ? CHANNEL_TYPE_VS_COVER_IMAGE[item.type]
              : CHANNEL_TYPE_VS_COVER_IMAGE[CHANNEL_TYPES.WEBSITE])) as string;

          // For non-default sections, check if this item is from the default section
          // Items are from default section if:
          // 1. We're in the default section (name === 'default') OR
          // 2. This is one of the last defaultItemsCount items in a non-default section
          const isDefaultItem = name === 'default' || (name !== 'default' && i >= cardItems.length - defaultItemsCount);

          return (
            <Card
              key={i}
              i={i}
              title={item.title}
              subtitle={item.subtitle}
              link={item.link}
              cover={coverImage}
              isDefault={isDefaultItem}
            />
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

export { Linkees };
