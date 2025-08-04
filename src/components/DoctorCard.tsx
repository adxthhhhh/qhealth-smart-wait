import { Star, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  experience: number;
  education: string;
  availability: string;
  imageUrl: string;
  consultationFee: number;
}

interface DoctorCardProps {
  doctor: Doctor;
}

export const DoctorCard = ({ doctor }: DoctorCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex gap-4">
          {/* Doctor Image */}
          <div className="w-20 h-20 rounded-full bg-medical-light flex items-center justify-center">
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

          {/* Doctor Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg text-foreground">{doctor.name}</h3>
                <p className="text-medical-blue font-medium">{doctor.specialty}</p>
                <p className="text-sm text-muted-foreground">{doctor.education}</p>
                <p className="text-sm text-muted-foreground">{doctor.experience} years experience</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{doctor.rating}</span>
                <span className="text-sm text-muted-foreground">({doctor.reviewCount})</span>
              </div>
            </div>

            {/* Availability and Fee */}
            <div className="mt-3 flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-accent" />
                <span className="text-sm text-muted-foreground">{doctor.availability}</span>
              </div>
              <Badge variant="secondary" className="bg-medical-light text-medical-blue">
                ₹{doctor.consultationFee} consultation
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-6 pb-6 pt-0">
        <div className="flex gap-3 w-full">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => navigate(`/doctor/${doctor.id}`)}
          >
            View Profile
          </Button>
          <Button 
            className="flex-1 bg-primary hover:bg-primary/90"
            onClick={() => navigate(`/appointment/${doctor.id}`)}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Book Appointment
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};