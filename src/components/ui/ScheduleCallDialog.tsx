import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Label from '@radix-ui/react-label';
import * as Select from '@radix-ui/react-select';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, Check } from 'lucide-react';
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

  // Project types
  const projectTypes = [
    { value: 'web3', label: 'Web3 Development' },
    { value: 'brand', label: 'Brand Consultation' },
    { value: 'dev', label: 'Dev Sprint' },
    { value: 'metaverse', label: 'Metaverse Experience' },
    { value: 'ai', label: 'AI Development' },
    { value: 'digital', label: 'Digital Transformation' }
  ];
  
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>
            
            <Dialog.Content asChild>
              <motion.div
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg bg-deepCosmos-800 rounded-xl shadow-xl p-6 z-[101]"
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
                      className="w-full bg-deepCosmos-700 border border-deepCosmos-600 rounded-lg px-4 py-2 text-prismWhite focus:border-metaEmerald-600 transition-colors"
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
                      className="w-full bg-deepCosmos-700 border border-deepCosmos-600 rounded-lg px-4 py-2 text-prismWhite focus:border-metaEmerald-600 transition-colors"
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
                      className="w-full bg-deepCosmos-700 border border-deepCosmos-600 rounded-lg px-4 py-2 text-prismWhite focus:border-metaEmerald-600 transition-colors"
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
                      <Select.Trigger className="w-full bg-deepCosmos-700 border border-deepCosmos-600 rounded-lg px-4 py-2 text-prismWhite focus:border-metaEmerald-600 transition-colors flex items-center justify-between">
                        <Select.Value placeholder="Select project type" />
                        <Select.Icon>
                          <ChevronDown size={16} />
                        </Select.Icon>
                      </Select.Trigger>
                      
                      <Select.Portal>
                        <Select.Content position="popper" sideOffset={5} className="bg-deepCosmos-700 border border-deepCosmos-600 rounded-lg overflow-hidden shadow-lg z-[200]">
                          <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-deepCosmos-600 cursor-default">
                            <ChevronDown className="transform rotate-180 text-prismWhite" size={16} />
                          </Select.ScrollUpButton>
                          
                          <Select.Viewport className="p-1">
                            {projectTypes.map((type) => (
                              <Select.Item 
                                key={type.value} 
                                value={type.value} 
                                className="px-4 py-2 text-prismWhite hover:bg-metaEmerald-600/20 data-[highlighted]:bg-metaEmerald-600/20 rounded-md cursor-pointer flex items-center"
                              >
                                <Select.ItemText>{type.label}</Select.ItemText>
                                <Select.ItemIndicator className="absolute right-2 inline-flex items-center justify-center">
                                  <Check size={16} className="text-metaEmerald-600" />
                                </Select.ItemIndicator>
                            </Select.Item>
                            ))}
                          </Select.Viewport>
                          
                          <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-deepCosmos-600 cursor-default">
                            <ChevronDown className="text-prismWhite" size={16} />
                          </Select.ScrollDownButton>
                        </Select.Content>
                      </Select.Portal>
                    </Select.Root>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label.Root className="text-sm font-medium text-quantumGrey-300 mb-1 block">
                        Date
                      </Label.Root>
                      <Select.Root
                        value={formData.date}
                        onValueChange={(value) => setFormData({ ...formData, date: value })}
                      >
                        <Select.Trigger className="w-full bg-deepCosmos-700 border border-deepCosmos-600 rounded-lg px-4 py-2 text-prismWhite focus:border-metaEmerald-600 transition-colors flex items-center justify-between">
                          <Select.Value placeholder="Select date" />
                          <Select.Icon>
                            <ChevronDown size={16} />
                          </Select.Icon>
                        </Select.Trigger>
                        
                        <Select.Portal>
                          <Select.Content position="popper" sideOffset={5} className="bg-deepCosmos-700 border border-deepCosmos-600 rounded-lg overflow-hidden shadow-lg z-[200]">
                            <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-deepCosmos-600 cursor-default">
                              <ChevronDown className="transform rotate-180 text-prismWhite" size={16} />
                            </Select.ScrollUpButton>
                            
                            <Select.Viewport className="p-1">
                              {dateOptions.map((date) => (
                                <Select.Item
                                  key={date}
                                  value={date}
                                  className="px-4 py-2 text-prismWhite hover:bg-metaEmerald-600/20 data-[highlighted]:bg-metaEmerald-600/20 rounded-md cursor-pointer flex items-center"
                                >
                                  <Select.ItemText>{date}</Select.ItemText>
                                  <Select.ItemIndicator className="absolute right-2 inline-flex items-center justify-center">
                                    <Check size={16} className="text-metaEmerald-600" />
                                  </Select.ItemIndicator>
                                </Select.Item>
                              ))}
                            </Select.Viewport>
                            
                            <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-deepCosmos-600 cursor-default">
                              <ChevronDown className="text-prismWhite" size={16} />
                            </Select.ScrollDownButton>
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
                        <Select.Trigger className="w-full bg-deepCosmos-700 border border-deepCosmos-600 rounded-lg px-4 py-2 text-prismWhite focus:border-metaEmerald-600 transition-colors flex items-center justify-between">
                          <Select.Value placeholder="Select time" />
                          <Select.Icon>
                            <ChevronDown size={16} />
                          </Select.Icon>
                        </Select.Trigger>
                        
                        <Select.Portal>
                          <Select.Content position="popper" sideOffset={5} className="bg-deepCosmos-700 border border-deepCosmos-600 rounded-lg overflow-hidden shadow-lg z-[200]">
                            <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-deepCosmos-600 cursor-default">
                              <ChevronDown className="transform rotate-180 text-prismWhite" size={16} />
                            </Select.ScrollUpButton>
                            
                            <Select.Viewport className="p-1">
                              {timeSlots.map((time) => (
                                <Select.Item
                                  key={time}
                                  value={time}
                                  className="px-4 py-2 text-prismWhite hover:bg-metaEmerald-600/20 data-[highlighted]:bg-metaEmerald-600/20 rounded-md cursor-pointer flex items-center"
                                >
                                  <Select.ItemText>{time}</Select.ItemText>
                                  <Select.ItemIndicator className="absolute right-2 inline-flex items-center justify-center">
                                    <Check size={16} className="text-metaEmerald-600" />
                                  </Select.ItemIndicator>
                                </Select.Item>
                              ))}
                            </Select.Viewport>
                            
                            <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-deepCosmos-600 cursor-default">
                              <ChevronDown className="text-prismWhite" size={16} />
                            </Select.ScrollDownButton>
                          </Select.Content>
                        </Select.Portal>
                      </Select.Root>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-metaEmerald-600 text-deepCosmos-900 font-bold py-3 px-4 rounded-lg hover:bg-metaEmerald-500 transition-colors mt-6"
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