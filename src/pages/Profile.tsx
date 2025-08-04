import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Calendar, Clock, MapPin, Phone, Mail, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/Header";

export const Profile = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Mock user data (in real app, this would come from authentication)
  const userData = {
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+91 98765 43210",
    address: "123 Main Street, Mumbai, Maharashtra",
    dateOfBirth: "1990-05-15",
    bloodGroup: "O+"
  };

  // Get appointments from localStorage
  const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');

  const getStatusBadge = (appointment: any) => {
    const appointmentDate = new Date(appointment.date);
    const today = new Date();
    
    if (appointmentDate < today) {
      return <Badge variant="secondary">Completed</Badge>;
    } else if (appointmentDate.toDateString() === today.toDateString()) {
      return <Badge className="bg-accent text-accent-foreground">Today</Badge>;
    } else {
      return <Badge className="bg-primary text-primary-foreground">Upcoming</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8">My Profile</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Information */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 rounded-full bg-medical-light mx-auto mb-4 flex items-center justify-center">
                      <User className="h-12 w-12 text-medical-blue" />
                    </div>
                    <h3 className="text-xl font-semibold">{userData.name}</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{userData.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{userData.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{userData.address}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date of Birth:</span>
                      <span className="text-sm">{new Date(userData.dateOfBirth).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Blood Group:</span>
                      <span className="text-sm font-medium">{userData.bloodGroup}</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Appointments History */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    My Appointments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {appointments.length === 0 ? (
                    <div className="text-center py-8">
                      <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No appointments yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Book your first appointment to start tracking your medical visits.
                      </p>
                      <Button onClick={() => navigate('/')}>
                        Book Appointment
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {appointments.map((appointment: any) => (
                        <Card key={appointment.id} className="border-l-4 border-l-primary">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h4 className="font-semibold">{appointment.doctorName}</h4>
                                  {getStatusBadge(appointment)}
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>{new Date(appointment.date).toLocaleDateString()}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    <span>{appointment.time}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="w-4 h-4 bg-primary rounded text-xs text-primary-foreground flex items-center justify-center font-bold">
                                      #
                                    </span>
                                    <span>Token: {appointment.tokenNumber}</span>
                                  </div>
                                  {appointment.symptoms && (
                                    <div className="md:col-span-2">
                                      <span className="font-medium">Symptoms: </span>
                                      <span>{appointment.symptoms}</span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="ml-4">
                                {new Date(appointment.date) >= new Date() && (
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => navigate(`/wait-time/${appointment.id}`)}
                                  >
                                    View Details
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button 
                      onClick={() => navigate('/')}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Book New Appointment
                    </Button>
                    <Button variant="outline">
                      <User className="h-4 w-4 mr-2" />
                      Find Doctors
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};