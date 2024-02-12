"use client";
import Image from 'next/image';
import '/public/css/createServer.css'
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FileUpload } from "@/components/file-upload";
import { useRouter } from "next/navigation"
import { Button } from '../ui/button';
import { useModal } from '@/hooks/useModal';

interface ButtonContent {
  [key: string]: {
    text: string;
    path: string;
  };
}
interface Arrow {
  path: string;
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Server name is required."
  }),
  imageUrl: z.string().min(1, {
    message: "Server image is required."
  })
});

const buttonContent: ButtonContent = {
  1: {
    text: "Create My Own",
    path: '/svgs/myOwn.svg'
  },
  2: {
    text: "Gaming",
    path: '/svgs/gaming.svg'
  },
  3: {
    text: "School Club",
    path: '/svgs/school.svg'
  },
  4: {
    text: "Study Group",
    path: '/svgs/study.svg'
  },
  5: {
    text: "Friends",
    path: '/svgs/friends.svg'
  },
  6: {
    text: "Artist & Creators",
    path: '/svgs/artistandcreators.svg'
  },
  7: {
    text: "Local Community",
    path: '/svgs/local.svg'
  },
  8: {
    text: "For me and my friends",
    path: '/svgs/meandFriends.svg'
  },
  9: {
    text: "For a club or community",
    path: '/svgs/cluborcommunity.svg'
  },
}

const arrow: Arrow = {
  path: '/svgs/arrow.svg'
}

export const CreateServerModal = () => {
  const router = useRouter();
  const { isOpen, onClose, type } = useModal()
  const isModalOpen = isOpen && type === 'createServer'
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    }
  });
  const isLoading = form.formState.isSubmitting;
  const [showSecondDiv, setShowSecondDiv] = useState(false);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);
  const [showThirdDiv, setShowThirdDiv] = useState(false)
  const customStyles = {
    borderRadius: '8px',
    border: '1px solid hsl( 228 calc( 1 * 6%) 32.5% / 0.48)',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    width: '100%',
    padding: '0',
    height: '15%'
  };
  const imageStyle = {
    margin: '8px 8px 8px 16px'
  }
  const divStyle = {
    fontSize: '16px',
    lineHeight: '1.25',
    fontWeight: '700'
  }

  const handleButtonClick = (index: any) => {
    setSelectedButtonIndex(index);
    if (index >= 7) {
      setShowSecondDiv(false);
      setShowThirdDiv(true);
    } else {
      setShowSecondDiv(true);
    }
  };

  const handleBackButtonClick = () => {
    if (showThirdDiv) {
      setShowThirdDiv(false);
      setShowSecondDiv(true);
    } else if (showSecondDiv) {
      setShowSecondDiv(false);
      setSelectedButtonIndex(null);
    }
  };

  const handleNextButtonClick = () => {
    setShowSecondDiv(false);
    setShowThirdDiv(true);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/servers", values);
      form.reset();
      router.refresh();
      onClose()
    } catch (error) {
      console.log(error);
    }
  }

  const handleClose = () => {
    form.reset()
    onClose()
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white dark:bg-[#313338] rounded border-transparent pb-0 pr-0 pl-0" style={{
        borderRadius: '7px',
        transition: "ease"
      }}>
        <DialogHeader className="px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            {!showSecondDiv && !showThirdDiv
              ? 'Create Your Server'
              : showThirdDiv
                ? "Customize Your Server"
                : "Tell Us More About Your Server"}
          </DialogTitle>
          <DialogDescription className="text-center text-black dark:text-[#B5BAC1]">
            {!showSecondDiv && !showThirdDiv
              ? "Your server is where you and your friends hang out. Make yours and start talking."
              : showThirdDiv
                ? "Give your new server a personality with a name and an icon. You can always change it later."
                : "In order to help you with your setup, is your new server for just a few friends or a larger community?"}
          </DialogDescription>
        </DialogHeader>
        <div className={`${(!showSecondDiv && !showThirdDiv) ? 'dialogContent overflow-y-scroll' : ''} pr-5 pl-5`}>
          {!showSecondDiv && !showThirdDiv && (
            <>
              {Object.keys(buttonContent).map((key, index) => (
                <React.Fragment key={key}>
                  {(index !== 7 && index !== 8) && (
                    <Button
                      style={customStyles}
                      className="dark:text-white text-black bg-white dark:bg-[#313338] test"
                      onClick={() => handleButtonClick(index)}
                    >
                      <Image src={buttonContent[key].path} alt={buttonContent[key].text} width={40} height={40} style={imageStyle} />
                      <div style={divStyle}>
                        {buttonContent[key].text}
                      </div>
                      <Image src={arrow.path} alt="" width={20} height={20} className="ml-auto mr-4" />
                    </Button>
                  )}
                  {index === 0 && (
                    <div className=' text-black dark:text-[#B5BAC1]' style={{ fontSize: '16px', fontWeight: '600', marginTop: '16px', marginBottom: '10px'}}>
                      Start from template
                    </div>
                  )}
                </React.Fragment>
              ))}
            </>
          )}

          {showSecondDiv && selectedButtonIndex !== null && (
            <div style={{ marginBottom: '8px' }}>
              {Object.keys(buttonContent).slice(7, 9).map((key, index) => (
                <Button style={customStyles}  className="dark:text-white text-black bg-white dark:bg-[#313338] test" key={key} onClick={() => handleButtonClick(7 + index)}>
                  <Image src={buttonContent[key].path} alt={buttonContent[key].text} width={40} height={40} style={imageStyle} />
                  <div style={divStyle}>
                    {buttonContent[key].text}
                  </div>
                  <Image src={arrow.path} alt="" width={20} height={20} className="ml-auto mr-4" />
                </Button>
              ))}
              <div className="text-center from-neutral-200">Not sure? You can <a role="button" onClick={handleNextButtonClick} className="text-[#069ae5]">skip this question</a> for now.</div>
            </div>
          )}
          {showThirdDiv && (
            <div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="space-y-8 px-6">
                    <div className="flex items-center justify-center text-center">
                      <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <FileUpload
                                endpoint="serverImage"
                                value={field.value}
                                onChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel
                            className="uppercase text-xs font-bold text-zinc-500 dark:text-[#adb2b9]"
                          >
                            Server name
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={isLoading}
                              className="bg-[#e6e6e9] dark:text-white border-black dark:bg-[#1e1f22] border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                              placeholder="Enter server name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {showThirdDiv && (
                    <Button variant="primary" disabled={isLoading} className="pl-8 pr-8 absolute right-4 bottom-3" type="submit">
                      Create
                    </Button>
                  )}
                </form>
              </Form>
            </div>
          )}

        </div>
        <DialogFooter className="w-full p-3 bg-white dark:bg-[#2b2d31]" style={{
          display: "flex",
          justifyContent: `${!showThirdDiv ? 'start' : 'space-between'}`
        }}>
          {showThirdDiv && (
            <Button className="bg-transparent hover:bg-transparent text-black dark:text-white" onClick={handleBackButtonClick}>
              Back
            </Button>
          )}
          {showSecondDiv && !showThirdDiv && (
            <>
              <Button className="bg-transparent hover:bg-transparent text-black dark:text-white" onClick={handleBackButtonClick}>
                Back
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
