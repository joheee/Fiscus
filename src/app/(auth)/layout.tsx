/**
 * A shared layout component for authentication pages like Login and Register.
 * It provides a consistent, centered layout with a card-like appearance
 * for any pages rendered within it.
 *
 * @param props - The component props.
 * @param props.children - The page component to be rendered inside the layout.
 * @returns The rendered authentication layout.
 * @todo 
 * [] Add responsive styling for mobile devices
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        {children}
      </div>
    </main>
  );
}
