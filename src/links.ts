import { CHANNEL_TYPES } from './Linkees/index';

import { ItemType } from '../src/Linkees/ts';

interface IObjectKeys {
  [key: string]: ItemType[];
}

export const LINKS: IObjectKeys = {
  '': [],
  default: [
    {
      title: 'Portfolio',
      subtitle: 'See more examples of our work.',
      type: CHANNEL_TYPES.STIAWAN,
      link: 'https://www.stiawan.com/photography',
    },
    {
      title: 'Instagram',
      subtitle: 'Follow our updates.',
      type: CHANNEL_TYPES.INSTAGRAM,
      link: 'https://www.instagram.com/stiawandotcom',
    },
  ],
  'The Royal Kitchen': [
    {
      title: 'Proposal',
      subtitle: 'Here is my proposal for you.',
      type: CHANNEL_TYPES.PROPOSAL,
      link: 'https://www.canva.com/design/DAFt316vkNM/mEuh6OKRUXYnvQn97okQSw/view?website#2',
    },
    {
      title: 'Quote',
      subtitle: 'Here is the proposed cost for the project.',
      type: CHANNEL_TYPES.QUOTE,
      link: 'https://stiawan.notion.site/Social-Media-Management-Quote-ec2610e9828b4d97aca76daa97dda23b?pvs=4',
    },
  ],
  'My Villa Management': [
    {
      title: 'Umalas Villa - Boris',
      subtitle: 'Photo preview and downloads.',
      type: CHANNEL_TYPES.PHOTOS,
      link: 'https://photos.app.goo.gl/3K6qnmVvZywmk96q8',
    },
  ],
  'Inspiral Architect': [
    {
      title: 'Krysnalaya - Ryan',
      subtitle: 'Photo preview and downloads.',
      type: CHANNEL_TYPES.PHOTOS,
      link: 'https://photos.app.goo.gl/C2HPt1DPtSpWLB7e6',
    },
  ],
};
