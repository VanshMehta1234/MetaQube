import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Label from '@radix-ui/react-label';
import * as Select from '@radix-ui/react-select';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown } from 'lucide-react';
import { format, addDays } from 'date-fns';

interface ScheduleCallDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ScheduleCallDialog: React.FC<ScheduleCallDialogProps> = ({ open, onOpenChange }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    date: '',
    time: '',
  });
  
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Scheduling call with data:', formData);
    setSubmitted(true);
    
    // Reset form after showing success message
    setTimeout(() => {
      setSubmitted(false);
      onOpenChange(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        projectType: '',
        date: '',
        time: '',
      });
    }, 2000);
  };
  
  // Generate next 7 days for date selection
  const dateOptions = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(new Date(), i + 1);
    return format(date, 'EEEE, MMMM d');
  });
  
  // Time slots
  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];
  
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>
            
            <Dialog.Content asChild>
              <motion.div
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-deepCosmos-800 rounded-xl shadow-xl p-6 z-50"
                initial={{ opacity: 0, scale: 0.95, y: '-45%' }}
                animate={{ opacity: 1, scale: 1, y: '-50%' }}
                exit={{ opacity: 0, scale: 0.95, y: '-45%' }}
              >
                <Dialog.Title className="text-2xl font-bold text-prismWhite mb-4">
                  Schedule a Call
                </Dialog.Title>
                
                <Dialog.Description className="text-quantumGrey-300 mb-6">
                  Fill out the form below and we'll set up a time to discuss your project.
                </Dialog.Description>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label.Root className="text-sm font-medium text-quantumGrey-300 mb-1 block">
                      Name
                    </Label.Root>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-deepCosmos-700 border border-deepCosmos-600 rounded-lg px-4 py-2 text-prismWhite focus:border-metaEmerald-500 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <Label.Root className="text-sm font-medium text-quantumGrey-300 mb-1 block">
                      Email
                    </Label.Root>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-deepCosmos-700 border border-deepCosmos-600 rounded-lg px-4 py-2 text-prismWhite focus:border-metaEmerald-500 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <Label.Root className="text-sm font-medium text-quantumGrey-300 mb-1 block">
                      Company
                    </Label.Root>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-deepCosmos-700 border border-deepCosmos-600 rounded-lg px-4 py-2 text-prismWhite focus:border-metaEmerald-500 transition-colors"
                      placeholder="Company name (optional)"
                    />
                  </div>
                  
                  <div>
                    <Label.Root className="text-sm font-medium text-quantumGrey-300 mb-1 block">
                      Project Type
                    </Label.Root>
                    <Select.Root
                      value={formData.projectType}
                      onValueChange={(value) => setFormData({ ...formData, projectType: value })}
                    >
                      <Select.Trigger className="w-full bg-deepCosmos-700 border border-deepCosmos-600 rounded-lg px-4 py-2 text-prismWhite focus:border-metaEmerald-500 transition-colors flex items-center justify-between">
                        <Select.Value placeholder="Select project type" />
                        <Select.Icon>
                          <ChevronDown size={16} />
                        </Select.Icon>
                      </Select.Trigger>
                      
                      <Select.Portal>
                        <Select.Content className="bg-deepCosmos-700 border border-deepCosmos-600 rounded-lg overflow-hidden">
                          <Select.Viewport>
                            <Select.Item value="web3" className="px-4 py-2 text-prismWhite hover:bg-deepCosmos-600 cursor-pointer">
                              <Select.ItemText>Web3 Product</Select.ItemText>
                            </Select.Item>
                            <Select.Item value="brand" className="px-4 py-2 text-prismWhite hover:bg-deepCosmos-600 cursor-pointer">
                              <Select.ItemText>Brand Design</Select.ItemText>
                            </Select.Item>
                            <Select.Item value="dev" className="px-4 py-2 text-prismWhite hover:bg-deepCosmos-600 cursor-pointer">
                              <Select.ItemText>Dev Sprint</Select.ItemText>
                            </Select.Item>
                            <Select.Item value="metaverse" className="px-4 py-2 text-prismWhite hover:bg-deepCosmos-600 cursor-pointer">
                              <Select.ItemText>Metaverse</Select.ItemText>
                            </Select.Item>
                            <Select.Item value="ai" className="px-4 py-2 text-prismWhite hover:bg-deepCosmos-600 cursor-pointer">
                              <Select.ItemText>AI Integration</Select.ItemText>
                            </Select.Item>
                          </Select.Viewport>
                        </Select.Content>
                      </Select.Portal>
                    </Select.Root>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label.Root className="text-sm font-medium text-quantumGrey-300 mb-1 block">
                        Date
                      </Label.Root>
                      <Select.Root
                        value={formData.date}
                        onValueChange={(value) => setFormData({ ...formData, date: value })}
                      >
                        <Select.Trigger className="w-full bg-deepCosmos-700 border border-deepCosmos-600 rounded-lg px-4 py-2 text-prismWhite focus:border-metaEmerald-500 transition-colors flex items-center justify-between">
                          <Select.Value placeholder="Select date" />
                          <Select.Icon>
                            <ChevronDown size={16} />
                          </Select.Icon>
                        </Select.Trigger>
                        
                        <Select.Portal>
                          <Select.Content className="bg-deepCosmos-700 border border-deepCosmos-600 rounded-lg overflow-hidden">
                            <Select.Viewport>
                              {dateOptions.map((date) => (
                                <Select.Item
                                  key={date}
                                  value={date}
                                  className="px-4 py-2 text-prismWhite hover:bg-deepCosmos-600 cursor-pointer"
                                >
                                  <Select.ItemText>{date}</Select.ItemText>
                                </Select.Item>
                              ))}
                            </Select.Viewport>
                          </Select.Content>
                        </Select.Portal>
                      </Select.Root>
                    </div>
                    
                    <div>
                      <Label.Root className="text-sm font-medium text-quantumGrey-300 mb-1 block">
                        Time
                      </Label.Root>
                      <Select.Root
                        value={formData.time}
                        onValueChange={(value) => setFormData({ ...formData, time: value })}
                      >
                        <Select.Trigger className="w-full bg-deepCosmos-700 border border-deepCosmos-600 rounded-lg px-4 py-2 text-prismWhite focus:border-metaEmerald-500 transition-colors flex items-center justify-between">
                          <Select.Value placeholder="Select time" />
                          <Select.Icon>
                            <ChevronDown size={16} />
                          </Select.Icon>
                        </Select.Trigger>
                        
                        <Select.Portal>
                          <Select.Content className="bg-deepCosmos-700 border border-deepCosmos-600 rounded-lg overflow-hidden">
                            <Select.Viewport>
                              {timeSlots.map((time) => (
                                <Select.Item
                                  key={time}
                                  value={time}
                                  className="px-4 py-2 text-prismWhite hover:bg-deepCosmos-600 cursor-pointer"
                                >
                                  <Select.ItemText>{time}</Select.ItemText>
                                </Select.Item>
                              ))}
                            </Select.Viewport>
                          </Select.Content>
                        </Select.Portal>
                      </Select.Root>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-metaEmerald-500 text-deepCosmos-900 font-bold py-3 px-4 rounded-lg hover:bg-metaEmerald-400 transition-colors mt-6"
                  >
                    {submitted ? 'Call Scheduled!' : 'Schedule Call'}
                  </button>
                </form>
                
                <Dialog.Close asChild>
                  <button
                    className="absolute top-4 right-4 text-quantumGrey-300 hover:text-prismWhite transition-colors"
                    aria-label="Close"
                  >
                    <X size={20} />
                  </button>
                </Dialog.Close>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};

export default ScheduleCallDialog;