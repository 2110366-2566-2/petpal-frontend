"use client";
import React from "react";
import { usePathname } from "next/navigation";
// import {getServerSession} from "next-auth";

import NavBar from "@/app/_component/navbar";
import ProfilePictureComponent from "../../_components/ProfilePictureComponent";
import RatingComponent from "../../_components/RatingComponent";
import ServiceListComponent from "../../_components/ServiceListComponent";
import AdditionalImageComponent from "../../_components/AdditionalImageComponent";
import SmallButtonComponent from "../../_components/SmallButtonComponent";

import ServiceInterface from "../../_interface/ServiceInterface";
import ServiceProviderInterface from "../../_interface/ServiceProviderInterface";
import ButtonPropsInterface from "../../_interface/ButtonPropsInterface";

import { exampleProvider } from "../../_interface/ServiceProviderInterface";
import {
    editProfileButtonProps,
    chagnePasswordButtonProps,
} from "../../_interface/ButtonPropsInterface";

export default function EmailServiceProviderProfile({
    params,
}: {
    params: { email: string };
}) {
    var email: string = params.email;
    let serviceProvider: ServiceProviderInterface;
    if (email == "") {
        serviceProvider = exampleProvider;
    } else {
        serviceProvider = exampleProvider;
        serviceProvider.Name = email;
    }

    var thisEditProfileButton = editProfileButtonProps;
    thisEditProfileButton.Link = usePathname() + "edit";

    return (
        <div className="items-center">
            <div className="flex mx-auto my-[50px] grid-cols-2 items-center max-w-[1000px] text-[18px]">
                <div className="max-w-[300px] m-[40px] space-y-[10px] float-left mt-[0px] items-top">
                    <ProfilePictureComponent />
                    <h1 className="text-[32px]">
                        <b>{serviceProvider.Name}</b>
                    </h1>
                    <RatingComponent Rating={serviceProvider.Rating} />
                    <p className="text-[18px]">{serviceProvider.Description}</p>
                    {email == "me" ? (
                        <div className="space-y-[20px] block">
                            <SmallButtonComponent
                                ButtonProps={thisEditProfileButton}
                            ></SmallButtonComponent>
                            <SmallButtonComponent
                                ButtonProps={chagnePasswordButtonProps}
                            ></SmallButtonComponent>
                        </div>
                    ) : (
                        <></>
                    )}
                    {/* <div className='space-y-[20px] block'>
            <SmallButtonComponent ButtonProps={thisEditProfileButton}></SmallButtonComponent>
            <SmallButtonComponent ButtonProps={chagnePasswordButtonProps}></SmallButtonComponent>
          </div> */}
                </div>
                <div className="max-w-[600px] w-[600px] m-[40px] float-right space-y-[30px] mt-[0px]">
                    <AdditionalImageComponent></AdditionalImageComponent>
                    <div className="space-y-[10px]">
                        <p>
                            <b>Address:</b> {serviceProvider.Address}
                        </p>
                        <p>
                            <b>Phone:</b> {serviceProvider.PhoneNumber}
                        </p>
                    </div>
                    <div className="space-y-[15px]">
                        <h1 className="text-[32px] ">
                            <b>Service Listing</b>
                        </h1>
                        <div className="flex space-x-[15px]">
                            {serviceProvider.ServiceList.map(
                                (Service: ServiceInterface) => (
                                    <ServiceListComponent
                                        Service={Service}
                                        key={Service.Name}
                                    ></ServiceListComponent>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
