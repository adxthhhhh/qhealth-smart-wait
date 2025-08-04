import { useParams, useNavigate } from "react-router-dom";
import { Star, Calendar, Clock, MapPin, Phone, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { doctors } from "@/data/doctors";
import { Header } from "@/components/Header";
import { useState } from "react";

export const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  const doctor = doctors.find(d => d.id === id);

  if (!doctor) {
    return (
      <div className="min-h-screen bg-background">
        <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold">Doctor not found</h1>
          <Button onClick={() => navigate('/')} className="mt-4">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const reviews = [
    { id: 1, patient: "Patient A", rating: 5, comment: "Excellent doctor, very thorough examination and clear explanation." },
    { id: 2, patient: "Patient B", rating: 4, comment: "Good experience, helpful staff and professional service." },
    { id: 3, patient: "Patient C", rating: 5, comment: "Dr. was very patient and answered all my questions." }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Doctor Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex gap-6">
              <div className="w-32 h-32 rounded-full bg-medical-light flex items-center justify-center">
                <img 
                  src={doctor.imageUrl} 
                  alt={doctor.name}
                  className="w-full h-full rounded-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://api.dicebear.com/7.x/personas/svg?seed=${doctor.name}&backgroundColor=e3f2fd`;
                  }}
                />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">{doctor.name}</h1>
                    <p className="text-xl text-medical-blue font-medium mb-2">{doctor.specialty}</p>
                    <p className="text-muted-foreground mb-4">{doctor.education}</p>
                    
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-accent" />
                        <span>{doctor.experience} years experience</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-accent" />
                        <span>{doctor.reviewCount} patients treated</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xl font-bold">{doctor.rating}</span>
                      <span className="text-muted-foreground">({doctor.reviewCount} reviews)</span>
                    </div>
                    <Badge className="bg-medical-light text-medical-blue">
                      ₹{doctor.consultationFee} consultation
                    </Badge>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-accent" />
                      <span className="text-sm">{doctor.availability}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-accent" />
                      <span className="text-sm">City Hospital, Mumbai</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-accent" />
                      <span className="text-sm">+91 98765 43210</span>
                    </div>
                  </div>

                  <Button 
                    size="lg"
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => navigate(`/appointment/${doctor.id}`)}
                  >
                    <Calendar className="h-5 w-5 mr-2" />
                    Book Appointment
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* About Doctor */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>About Doctor</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {doctor.name} is a highly experienced {doctor.specialty.toLowerCase()} with {doctor.experience} years of practice. 
                  Graduated from premier medical institutions, they specialize in comprehensive cardiac care including 
                  preventive cardiology, interventional procedures, and post-operative care. Known for patient-centered 
                  approach and staying updated with latest medical technologies.
                </p>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Patient Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-border pb-4 last:border-b-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="font-medium">{review.patient}</span>
                      </div>
                      <p className="text-muted-foreground text-sm">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Appointment Info */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Appointment Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Consultation Fee</h4>
                  <p className="text-2xl font-bold text-primary">₹{doctor.consultationFee}</p>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium mb-2">Available Hours</h4>
                  <p className="text-muted-foreground">{doctor.availability}</p>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium mb-2">Location</h4>
                  <p className="text-muted-foreground">City Hospital<br />Mumbai, Maharashtra</p>
                </div>
                
                <Button 
                  className="w-full bg-accent hover:bg-accent/90"
                  onClick={() => navigate(`/appointment/${doctor.id}`)}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};