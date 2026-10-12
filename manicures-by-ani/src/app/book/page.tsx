export const metadata = {
  title: 'Book an Appointment | Manicures by Ani',
  description: 'Book your appointment with Manicures by Ani in Leicester.',
};

export default function BookPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl text-center mb-8">Book an Appointment</h1>
      
      {/* 
        Phase 6 & 8: Booking Form and Policy Integration
        Will contain the multi-step or single-page booking form.
      */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-accent/10 text-center">
        <p className="text-muted-foreground mb-8">Booking form placeholder</p>
      </div>

      {/* Phase 8: Booking Policy (can also be integrated into the form above) */}
      <div id="policy" className="mt-16">
        <h2 className="text-2xl mb-4">Booking Policy</h2>
        <p className="text-muted-foreground">Policy placeholder</p>
      </div>
    </div>
  );
}
