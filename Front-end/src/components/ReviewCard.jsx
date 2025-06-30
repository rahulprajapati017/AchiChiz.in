import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, MoreHorizontal } from 'lucide-react';
import RatingStars from './RatingStars';

const ReviewCard = ({
  author,
  rating,
  date,
  title,
  content,
  verified,
  helpful,
  notHelpful,
  images = []
}) => {
  const [helpfulVotes, setHelpfulVotes] = useState(helpful);
  const [notHelpfulVotes, setNotHelpfulVotes] = useState(notHelpful);
  const [userVote, setUserVote] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const handleVote = (type) => {
    if (userVote === type) return;

    if (userVote === 'helpful' && type === 'not-helpful') {
      setHelpfulVotes((prev) => prev - 1);
      setNotHelpfulVotes((prev) => prev + 1);
    } else if (userVote === 'not-helpful' && type === 'helpful') {
      setNotHelpfulVotes((prev) => prev - 1);
      setHelpfulVotes((prev) => prev + 1);
    } else if (!userVote) {
      if (type === 'helpful') setHelpfulVotes((prev) => prev + 1);
      else setNotHelpfulVotes((prev) => prev + 1);
    }

    setUserVote(type);
  };

  const shouldTruncate = content.length > 300;
  const displayContent =
    shouldTruncate && !expanded ? content.slice(0, 300) + '...' : content;

  return (
    <div className="bg-white shadow-sm border p-6 hover:shadow-md transition-shadow hover:scale-105">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
            {author.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900">{author}</span>
              {verified && (
                <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                  Verified Purchase
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <RatingStars rating={rating} size="sm" />
              <span className="text-sm text-gray-500">
                {new Date(date).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        <MoreHorizontal className="w-5 h-5 text-gray-400" />
      </div>

      <h4 className="font-semibold text-gray-900 mb-3">{title}</h4>

      <p className="text-gray-700 leading-relaxed mb-4 whitespace-pre-line break-words">
        {displayContent}
        {shouldTruncate && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-blue-600 hover:text-blue-800 ml-1 font-medium"
          >
            {expanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </p>

      {images.length > 0 && (
        <div className="flex gap-2 mb-4 flex-wrap">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Review image ${index + 1}`}
              className="w-20 h-20 object-cover rounded-lg border hover:scale-105 transition-transform"
            />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleVote('helpful')}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
              userVote === 'helpful'
                ? 'bg-green-100 text-green-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ThumbsUp className="w-4 h-4" />
            Helpful ({helpfulVotes})
          </button>
          <button
            onClick={() => handleVote('not-helpful')}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
              userVote === 'not-helpful'
                ? 'bg-red-100 text-red-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ThumbsDown className="w-4 h-4" />
            Not helpful ({notHelpfulVotes})
          </button>
        </div>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          Report
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;
