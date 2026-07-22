// Server Component placeholder. Once Firebase auth ships (Phase 3), this
// will read the signed-in user's saved favorites from Firestore.
export default function FavoritesPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-gold mb-3">
        Your Stub Collection
      </p>
      <h1 className="font-display text-5xl tracking-wide mb-4">Favorites</h1>
      <p className="text-muted max-w-md mx-auto">
        Sign in to start saving movies. This screen will list your saved
        titles once authentication and Firestore are wired up.
      </p>
    </div>
  );
}
