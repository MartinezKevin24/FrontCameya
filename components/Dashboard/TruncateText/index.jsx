import React, {useState} from 'react'

export default function TruncateText({text, maxLength}) {
  const [showMore, setShowMore] = useState(false);

  const truncatedText = text.slice(0, maxLength);
  const shouldTruncate = text.length > maxLength;

  return (
    <div className='flex flex-col gap-2 text-gray-darkest'>
      <p>
        {shouldTruncate && !showMore ? `${truncatedText}...` : text}
      </p>
      {shouldTruncate && (
        <button
          onClick={() => setShowMore(!showMore)}
          className="text-blue-500 hover:text-blue-700"
        >
          {showMore ? 'Ver menos' : 'Ver más'}
        </button>
      )}
    </div>
  );
}
