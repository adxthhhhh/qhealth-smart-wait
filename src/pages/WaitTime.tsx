import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Clock, MapPin, Phone, CheckCircle, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Header } from "@/components/Header";

export const WaitTime = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Get appointment data from localStorage (in real app, this would be an API call)
  const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
  const appointment = appointments.find((apt: any) => apt.id === appointmentId);

  if (!appointment) {
    return (
      <div className="min-h-screen bg-background">
        <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold">Appointment not found</h1>
          <Button onClick={() => navigate('/')} className="mt-4">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  // Mock data for wait time calculation
  const currentToken = Math.floor(Math.random() * appointment.tokenNumber);
  const estimatedWaitTime = (appointment.tokenNumber - currentToken) * 15; // 15 minutes per patient
  const arrivalTime = new Date();
  arrivalTime.setMinutes(arrivalTime.getMinutes() + estimatedWaitTime - 30); // Arrive 30 min early

  const progress = (currentToken / appointment.tokenNumber) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <CheckCircle className="h-16 w-16 text-accent mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-foreground mb-2">Appointment Confirmed!</h1>
            <p className="text-muted-foreground">Your token number is ready</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Appointment Details */}
            <Card>
              <CardHeader>
                <CardTitle>Appointment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Doctor:</span>
                  <span className="font-medium">{appointment.doctorName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Date:</span>
                  <span>{new Date(appointment.date).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Time:</span>
                  <span>{appointment.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Patient:</span>
                  <span>{appointment.patientName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Token Number:</span>
                  <Badge className="bg-primary text-primary-foreground text-lg px-3 py-1">
                    #{appointment.tokenNumber}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Wait Time Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Timer className="h-5 w-5" />
                  Live Wait Time
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {Math.max(0, estimatedWaitTime)} minutes
                  </div>
                  <p className="text-muted-foreground">Estimated wait time</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current Token: #{currentToken}</span>
                    <span>Your Token: #{appointment.tokenNumber}</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <p className="text-xs text-center text-muted-foreground">
                    {appointment.tokenNumber - currentToken} patients ahead of you
                  </p>
                </div>

                <div className="bg-medical-light p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-accent" />
                    <span className="font-medium">Recommended Arrival Time</span>
                  </div>
                  <p className="text-lg font-bold text-accent">
                    {arrivalTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Arrive by this time to avoid waiting
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Hospital Information */}
            <Card>
              <CardHeader>
                <CardTitle>Hospital Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-accent mt-1" />
                  <div>
                    <p className="font-medium">City Hospital</p>
                    <p className="text-sm text-muted-foreground">
                      123 Medical Street<br />
                      Mumbai, Maharashtra 400001
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-accent" />
                  <div>
                    <p className="font-medium">Emergency Contact</p>
                    <p className="text-sm text-muted-foreground">+91 22 1234 5678</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card>
              <CardHeader>
                <CardTitle>Important Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>Carry a valid ID proof and previous medical records</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>Arrive at the recommended time to avoid waiting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>Visit the reception desk with your token number</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>Follow hospital safety protocols</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Button onClick={() => navigate('/')} variant="outline" className="mr-4">
              Book Another Appointment
            </Button>
            <Button onClick={() => navigate('/profile')}>
              View My Appointments
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};