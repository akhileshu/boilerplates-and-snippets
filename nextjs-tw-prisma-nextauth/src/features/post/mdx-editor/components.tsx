export const components = {
  Note: ({ message }: { message: string }) => (
    <div className="p-4 bg-yellow-100 border border-yellow-300 rounded">
      💡 {message}
    </div>
  ),
};
