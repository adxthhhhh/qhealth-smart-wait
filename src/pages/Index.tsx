import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { DoctorCard } from "@/components/DoctorCard";
import { doctors } from "@/data/doctors";
import { Heart, Shield, Star, Users, CheckCircle, Clock, Phone, Mail, MapPin, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
      
      {/* Home/Hero Section */}
      <section id="home" className="bg-gradient-to-r from-primary/10 to-accent/10 py-16">
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

      {/* About Us Section */}
      <section id="about" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">About QHealth</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              QHealth is revolutionizing healthcare delivery in Kerala by connecting patients with qualified doctors 
              through our smart appointment booking system. We eliminate waiting times and provide real-time updates 
              for a seamless healthcare experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-lg">
              <CardContent className="p-6 text-center">
                <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Expert Doctors</h3>
                <p className="text-muted-foreground">Verified professionals with years of experience</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardContent className="p-6 text-center">
                <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Smart Scheduling</h3>
                <p className="text-muted-foreground">AI-powered time predictions for efficient appointments</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Quality Care</h3>
                <p className="text-muted-foreground">Ensuring the best healthcare experience for all patients</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section id="product" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Product</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience the future of healthcare with our comprehensive digital platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Smart Appointment System</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3" />
                  <span>Real-time doctor availability</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3" />
                  <span>ML-powered consultation time prediction</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3" />
                  <span>Token-based queue management</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3" />
                  <span>Live wait time updates</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3" />
                  <span>Digital appointment history</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-8 rounded-lg">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">5-15 min</div>
                <div className="text-sm text-muted-foreground mb-4">Average consultation time</div>
                <div className="text-2xl font-semibold text-foreground mb-2">95% Accuracy</div>
                <div className="text-sm text-muted-foreground">ML prediction system</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive healthcare services designed for your convenience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <Heart className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">General Medicine</h3>
                <p className="text-sm text-muted-foreground">Comprehensive health checkups and treatment</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <Star className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Specialist Care</h3>
                <p className="text-sm text-muted-foreground">ENT, Cardiology, Dermatology and more</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <Clock className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Emergency Care</h3>
                <p className="text-sm text-muted-foreground">24/7 emergency consultation services</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <Shield className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Health Monitoring</h3>
                <p className="text-sm text-muted-foreground">Regular health tracking and reports</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Token Booking Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Book Your Token</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Skip the waiting room! Book your token online and get real-time updates on your appointment status.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-6">Quick Token Booking</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Select Department</label>
                      <select className="w-full p-3 border border-border rounded-md bg-background">
                        <option>General Medicine</option>
                        <option>Cardiology</option>
                        <option>ENT</option>
                        <option>Dermatology</option>
                        <option>Orthopedics</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Select Doctor</label>
                      <select className="w-full p-3 border border-border rounded-md bg-background">
                        <option>Dr. Sarah Johnson</option>
                        <option>Dr. Michael Chen</option>
                        <option>Dr. Emily Davis</option>
                        <option>Dr. Robert Wilson</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Preferred Time</label>
                      <input 
                        type="time" 
                        className="w-full p-3 border border-border rounded-md bg-background"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Patient Name</label>
                      <input 
                        type="text" 
                        className="w-full p-3 border border-border rounded-md bg-background"
                        placeholder="Enter patient name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        className="w-full p-3 border border-border rounded-md bg-background"
                        placeholder="Enter phone number"
                      />
                    </div>
                    <Button className="w-full">Book Token</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Current Token</h4>
                      <p className="text-2xl font-bold text-primary">A-15</p>
                    </div>
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Estimated Wait Time</h4>
                      <p className="text-2xl font-bold text-primary">12 min</p>
                    </div>
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-3">Token Benefits</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm">No physical waiting</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm">Real-time updates</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm">SMS notifications</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm">Accurate time predictions</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section id="contact" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Contact Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get in touch with us for any questions or support
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="space-y-6">
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-primary mr-4" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-muted-foreground">+91 9876543210</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-primary mr-4" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-muted-foreground">support@qhealth.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 text-primary mr-4" />
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p className="text-muted-foreground">
                      123 Medical Center, <br />
                      Kochi, Kerala 682001
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Send us a message</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input 
                      type="text" 
                      className="w-full p-3 border border-border rounded-md bg-background"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input 
                      type="email" 
                      className="w-full p-3 border border-border rounded-md bg-background"
                      placeholder="Your email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Message</label>
                    <textarea 
                      rows={4}
                      className="w-full p-3 border border-border rounded-md bg-background"
                      placeholder="Your message"
                    />
                  </div>
                  <Button className="w-full">Send Message</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
