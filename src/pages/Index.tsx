import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { DoctorCard } from "@/components/DoctorCard";
import { doctors } from "@/data/doctors";
import { Heart, Shield, Star, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDoctors = useMemo(() => {
    if (!searchTerm) return doctors;
    
    return doctors.filter(doctor => 
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const stats = [
    { icon: Users, label: "Happy Patients", value: "10,000+" },
    { icon: Shield, label: "Verified Doctors", value: "500+" },
    { icon: Star, label: "Average Rating", value: "4.8" },
    { icon: Heart, label: "Successful Treatments", value: "95%" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Your Health, Our Priority
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Book appointments with top doctors, skip the waiting room, and get real-time updates on your appointment status.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Find the Right Doctor for You
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform connects you with verified, experienced doctors across various specialties. 
              Book your appointment today and experience healthcare without the wait.
            </p>
          </div>

          {/* Search Results */}
          {searchTerm && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-foreground">
                Search Results for "{searchTerm}" ({filteredDoctors.length} found)
              </h3>
            </div>
          )}

          {/* Doctors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>

          {filteredDoctors.length === 0 && searchTerm && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No doctors found matching your search. Try different keywords.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
