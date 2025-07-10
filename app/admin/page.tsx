"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import UsersListPage, { Auth } from "./users/page";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [doctors, setDoctors] = useState(null);
  const [nurses, setNurses] = useState(null);
  const [cases, setCases] = useState(null);
  const [pending, setPending] = useState(null);

  useEffect(() => {
    const authString = localStorage.getItem("auth");

    const auth: Auth | null = authString ? JSON.parse(authString) : null;

    console.log("auth", auth);

    const fetchDash = async () => {
      try {
        //const res = await fetch(`${process.env.BACKEND_URL}/dash/`);
        const res = await fetch(`${process.env.BACKEND_URL}/dash`, {
          headers: {
            Authorization: `Bearer ${auth?.access_token}`,
          },
        });
        const data = await res.json();
        console.log("response:", data);

        setDoctors(data[0].doctors);
        setCases(data[0].cases_total);
        setPending(data[0].cases_pending);
        setNurses(data[0].nurses);
      } catch (error) {
        console.log("error:", error);
      }
    };

    fetchDash();
  }, []);
  // const stats = [
  //   { label: "Doctors", value: 3, icon: "/doctors.jpg" },
  //   { label: "Nurses", value: 2, icon: "/nurses.jpg" },
  //   { label: "Total Cases", value: 6, icon: "/cases.jpg" },
  //   { label: "Pending Cases", value: 1, icon: "/pending.jpg" },
  // ];

  return (
    <div className="p-12 mx-4 space-y-4 my-10">
      <h2 className="text-lg font-semibold">Admin Panel</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* {stats.map((stat, index) => (
          <Card key={index} className="flex items-center justify-between p-4">
            <div>
              <h4 className="text-sm font-medium">{stat.label}</h4>
              <p className="text-xl font-semibold">{stat.value}</p>
            </div>
            <Image src={stat.icon} alt={stat.label} width={70} height={70} />
          </Card>
        ))} */}
        <Card className="flex items-center justify-between p-4">
          <div>
            <h4 className="text-sm font-medium">Doctors</h4>
            <p className="text-xl font-semibold">{doctors}</p>
          </div>
          <Image src={"/doctors.jpg"} alt={"doctors"} width={70} height={70} />
        </Card>
        <Card className="flex items-center justify-between p-4">
          <div>
            <h4 className="text-sm font-medium">Nurses</h4>
            <p className="text-xl font-semibold">{nurses}</p>
          </div>
          <Image src={"/nurses.jpg"} alt={"nurses"} width={70} height={70} />
        </Card>
      </div>

      <div className="grid grid-cols-1 xxl:grid-cols-2 gap-4">
        <UsersListPage />
        {/* <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">List of Cases</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID#</TableHead>
                  <TableHead>Model Prediction</TableHead>
                  <TableHead>Nurse</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Doctor's Decision</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cases.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.prediction}</TableCell>
                    <TableCell>{item.nurse}</TableCell>
                    <TableCell>{item.doctor}</TableCell>
                    <TableCell>{item.decision}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card> */}

        {/* <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Top 4 Cases</h3>
            <div className="space-y-4">
              {topCases.map((top, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <MessageSquare className="text-blue-500 mt-1" />
                  <div>
                    <p className="font-medium">{top.title}</p>
                    <p className="text-sm text-muted-foreground">Doctor's Feedback: {top.feedback}</p>
                    <p className="text-xs text-muted-foreground">{top.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
}
