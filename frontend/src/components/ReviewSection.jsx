const reviews = [
  {
    name: "Aarav Sharma",
    rating: 5,
    comment: "Fantastic product! Quality is top-notch."
  },
  {
    name: "Priya Patel",
    rating: 4,
    comment: "Good value for money."
  },
  {
    name: "Sneha Iyer",
    rating: 3,
    comment: "Product is decent but packaging could improve."
  }
];

const ReviewSection = () => {

  return (

    <div className="bg-white rounded-xl shadow-md p-6 mt-10">

      <h3 className="text-2xl font-bold text-blue-700 mb-4">
        Customer Reviews
      </h3>

      <div className="space-y-4">

        {reviews.map((review, index) => (

          <div
            key={index}
            className="border rounded-lg p-4 bg-gray-50"
          >

            <p className="font-semibold">
              ⭐ {review.rating}/5 — {review.name}
            </p>

            <p className="text-gray-700">
              {review.comment}
            </p>

          </div>

        ))}

      </div>

    </div>

  );

};

export default ReviewSection;