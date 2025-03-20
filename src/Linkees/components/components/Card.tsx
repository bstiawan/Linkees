import React, { useEffect, useState } from 'react';

import '../../css/skeleton.css';
import '../../css/components.css';
import { motion } from 'framer-motion';
import { ICard } from '../../ts/interfaces';
import { getOpenGraphImage } from '../../utils/opengraph';

const variants = {
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeIn',
      type: 'spring',
      stiffness: 50,
    },
  }),
  hidden: { opacity: 0, y: 200 },
};

function Card(props: ICard): JSX.Element {
  const [imageUrl, setImageUrl] = useState<string>(props.cover);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  useEffect(() => {
    const fetchOpenGraphImage = async () => {
      // Only fetch OpenGraph for non-default items
      if (!props.isDefault) {
        setIsLoading(true);
        setImageError(false);
        const ogImage = await getOpenGraphImage(props.link);
        if (ogImage) {
          setImageUrl(ogImage);
        } else {
          setImageUrl(props.cover);
        }
        setIsLoading(false);
      } else {
        setImageUrl(props.cover);
      }
    };

    // Reset states when props change
    setImageError(false);
    setIsLoading(true);
    fetchOpenGraphImage();
  }, [props.link, props.isDefault, props.cover, props.title]);

  const handleImageError = () => {
    setImageError(true);
    setImageUrl(props.cover);
    setIsLoading(false);
  };

  return (
    <a href={props.link} target="_blank" rel="noopener noreferrer">
      <motion.div className="Card four columns" initial="hidden" animate="visible" custom={props.i} variants={variants}>
        <img
          className={`cover ${isLoading ? 'loading' : ''}`}
          src={imageError ? props.cover : imageUrl}
          alt={props.title}
          onError={handleImageError}
          onLoad={() => setIsLoading(false)}
        />
        <div className="data">
          <h2>{props.title}</h2>
          <p>{props.subtitle}</p>
        </div>
      </motion.div>
    </a>
  );
}

export default Card;
