/**
 * A shared layout component for authentication pages like Login and Register.
 * It provides a consistent, centered layout with a card-like appearance
 * for any pages rendered within it.
 *
 * @param props - The component props.
 * @param props.children - The page component to be rendered inside the layout.
 * @returns The rendered authentication layout.
 * @todo
 * [v] Add responsive styling for mobile devices
 * [v] Full screen card when in mobile devices
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen flex items-center justify-center bg-blue-accent p-6">
      <div
        className="sm:w-full sm:max-w-md sm:h-fit 
        rounded-lg p-6 bg-background shadow-md w-screen h-full"
      >
        {children}
      </div>
    </main>
  );
}
