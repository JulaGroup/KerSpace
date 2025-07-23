"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchMessages } from "@/components/dashboard/messagesData";
import { Mail, User, Calendar, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  sender: string;
  email: string;
  phone?: string;
  date: string;
  subject: string;
  message: string;
  read: boolean;
}

export default function MessagesList() {
  const [open, setOpen] = useState(false);
  const [selectedMsg, setSelectedMsg] = useState<Message | null>(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMessages() {
      try {
        // Replace with your JWT token logic
        const token = localStorage.getItem("token");
        const data = await fetchMessages(token!);
        setMessages(data);
      } catch (err) {
        setMessages([]);
      } finally {
        setLoading(false);
      }
    }
    loadMessages();
  }, []);

  const handleViewDetails = (msg: Message) => {
    setSelectedMsg(msg);
    setOpen(true);
  };

  const handleMarkAsRead = () => {
    if (selectedMsg) {
      setMessages((prev: any) =>
        prev.map((m: any) =>
          m.id === selectedMsg.id ? { ...m, read: true } : m
        )
      );
      setOpen(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-2">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-gray-100">Messages</h1>
        <div className="space-y-6">
          {messages.map((msg: Message) => (
            <Card
              key={msg.id}
              className={`border border-gray-800 bg-card text-gray-100 shadow-lg ${
                msg.read ? "" : "ring-2 ring-blue-500"
              }`}
            >
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-300" />
                  <span className="font-semibold">{msg.sender}</span>
                  <Mail className="h-4 w-4 ml-2 text-gray-400" />
                  <span className="text-xs text-gray-400">{msg.email}</span>
                  {msg.phone && (
                    <span className="text-xs text-gray-400 ml-2">
                      | {msg.phone}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-xs text-gray-400">{msg.date}</span>
                  {msg.read ? (
                    <span className="text-xs text-green-400 ml-2">Read</span>
                  ) : (
                    <span className="text-xs text-blue-400 ml-2">Unread</span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0 pb-4 px-4">
                <div className="font-bold text-lg mb-2 text-blue-200">
                  {msg.subject}
                </div>
                <div className="text-gray-300 mb-2">{msg.message}</div>
                <div className="flex justify-end">
                  <button
                    className="text-blue-400 hover:underline flex items-center gap-1"
                    onClick={() => handleViewDetails(msg)}
                  >
                    <Eye className="h-4 w-4" /> View Details
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-4xl h-2/3 mx-auto bg-card text-gray-100">
            {selectedMsg && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl mb-2">
                    {selectedMsg.subject}
                  </DialogTitle>
                </DialogHeader>
                <div className="mb-4">
                  <div className="font-semibold text-blue-200">
                    From: {selectedMsg.sender}
                  </div>
                  <div className="text-xs text-gray-400">
                    Email: {selectedMsg.email}
                  </div>
                  <div className="text-xs text-gray-400">
                    Phone: {selectedMsg.phone}
                  </div>
                  <div className="text-xs text-gray-400">
                    Date: {selectedMsg.date}
                  </div>
                  <div className="mt-4 text-gray-300">
                    {selectedMsg.message}
                  </div>
                </div>
                <DialogFooter>
                  {!selectedMsg.read && (
                    <Button
                      onClick={handleMarkAsRead}
                      className="bg-blue-500 text-white"
                    >
                      Mark as Read
                    </Button>
                  )}
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Close
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
