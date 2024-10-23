export default function About() {
  return (
    <div>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 text-center">About Us</h1>
        <p className="text-lg mb-6">
          Welcome to Recipe Finder! We are here to help you find the perfect
          recipe for any occasion.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
        <p className="text-lg mb-6">
          Have you ever been in the kitchen and not known what to cook or
          don&apos;t have any food in the fridge? We are here to help you find
          the perfect recipe for any occasion.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
        <p className="text-lg">
          If you have any questions or feedback, feel free to reach out to us at
          <a
            href="mailto:contact@recipefinder.com"
            className="text-primary hover:underline ml-1"
          >
            contact@recipefinder.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
