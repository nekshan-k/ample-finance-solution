'use client'

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/app/components/ui/input-otp';
import { useAuth } from '@/app/context/AuthContext';
import { toast } from 'sonner';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const { sendOTP, login } = useAuth();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'otp' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  const handleSendOTP = async () => {
    if (!phoneNumber) {
      toast.error('Please enter your phone number');
      return;
    }

    if (phoneNumber.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }

    setIsLoading(true);
    try {
      await sendOTP('+' + phoneNumber);
      toast.success('OTP sent successfully');
      setStep('otp');
      setCountdown(60);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 4) {
      toast.error('Please enter the 4-digit OTP');
      return;
    }

    setIsLoading(true);
    try {
      await login('+' + phoneNumber, otp);
      toast.success('Login successful!');
      onClose();
      setStep('phone');
      setPhoneNumber('');
      setOtp('');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Invalid OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep('phone');
      setPhoneNumber('');
      setOtp('');
      setCountdown(60);
    }, 200);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[95vw] max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-center">
            {step === 'phone' ? 'Login' : 'Verify OTP'}
          </DialogTitle>
          <DialogDescription className="text-center text-sm">
            {step === 'phone'
              ? 'Enter your phone number to receive an OTP'
              : `Enter the OTP sent to +${phoneNumber}`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6 py-2 sm:py-4">
          {step === 'phone' ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Phone Number</label>
                <PhoneInput
                  country={'in'}
                  value={phoneNumber}
                  onChange={(phone) => setPhoneNumber(phone)}
                  enableSearch={true}
                  countryCodeEditable={false}
                  placeholder="Enter phone number"
                  containerStyle={{
                    width: '100%',
                  }}
                  inputStyle={{
                    width: '100%',
                    height: '44px',
                    fontSize: '14px',
                    borderRadius: '0.5rem',
                    border: '2px solid hsl(var(--input))',
                    backgroundColor: 'hsl(var(--background))',
                    color: 'hsl(var(--foreground))',
                    paddingLeft: '48px',
                  }}
                  buttonStyle={{
                    border: '2px solid hsl(var(--input))',
                    borderRadius: '0.5rem 0 0 0.5rem',
                    backgroundColor: 'hsl(var(--background))',
                  }}
                  dropdownStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    color: 'hsl(var(--foreground))',
                    border: '1px solid hsl(var(--border))',
                  }}
                  searchStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    color: 'hsl(var(--foreground))',
                  }}
                />
              </div>

              <Button
                onClick={handleSendOTP}
                className="w-full h-11 text-base font-semibold"
                variant="gradient"
                disabled={isLoading || !phoneNumber}
              >
                {isLoading ? 'Sending...' : 'Send OTP'}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-3">
                <label className="text-sm font-medium text-center block text-foreground">
                  Enter OTP (Use 1234)
                </label>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={4}
                    value={otp}
                    onChange={setOtp}
                    className="gap-2 sm:gap-3"
                  >
                    <InputOTPGroup className="gap-2 sm:gap-3">
                      <InputOTPSlot index={0} className="w-12 h-12 sm:w-14 sm:h-14 text-xl sm:text-2xl font-bold border-2 rounded-lg" />
                      <InputOTPSlot index={1} className="w-12 h-12 sm:w-14 sm:h-14 text-xl sm:text-2xl font-bold border-2 rounded-lg" />
                      <InputOTPSlot index={2} className="w-12 h-12 sm:w-14 sm:h-14 text-xl sm:text-2xl font-bold border-2 rounded-lg" />
                      <InputOTPSlot index={3} className="w-12 h-12 sm:w-14 sm:h-14 text-xl sm:text-2xl font-bold border-2 rounded-lg" />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                {countdown > 0 ? (
                  <p className="text-center text-sm text-muted-foreground">
                    Resend OTP in {countdown}s
                  </p>
                ) : (
                  <button
                    onClick={async () => {
                      setCountdown(60);
                      setOtp('');
                      await handleSendOTP();
                    }}
                    className="text-center w-full text-sm text-primary hover:text-primary/80 font-medium"
                  >
                    Resend OTP
                  </button>
                )}
              </div>

              <div className="space-y-2">
                <Button
                  onClick={handleVerifyOTP}
                  className="w-full h-11 text-base font-semibold"
                  variant="gradient"
                  disabled={isLoading || otp.length !== 4}
                >
                  {isLoading ? 'Verifying...' : 'Verify OTP'}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    setStep('phone');
                    setOtp('');
                    setCountdown(60);
                  }}
                  className="w-full h-10 text-sm"
                >
                  Change Phone Number
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
