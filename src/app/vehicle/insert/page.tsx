'use client'

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zfd } from "zod-form-data";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Vehicle } from '@/types';

export interface FormValues {
    bicycle?: string;
    color?: string;
    fuel?: string;
    manufacturer?: string;
    model?: string;
    type?: string;
    vehicle?: string;
    vin?: string;
    vrm?: string;
}

export const formSchema = zfd.formData({
    bicycle: zfd.text(z.string().min(2, "Too short").max(20, "Too long")),
    color: zfd.text(z.string().min(2, "Too short").max(20, "Too long")),
    fuel: zfd.text(z.string().min(2, "Too short").max(20, "Too long")),
    manufacturer: zfd.text(z.string().min(2, "Too short").max(20, "Too long")),
    model: zfd.text(z.string().min(2, "Too short").max(20, "Too long")),
    type: zfd.text(z.string().min(2, "Too short").max(20, "Too long")),
    vehicle: zfd.text(z.string().min(2, "Too short").max(20, "Too long")),
    vin: zfd.text(z.string().min(2, "Too short").max(20, "Too long")),
    vrm: zfd.text(z.string().min(2, "Too short").max(20, "Too long")),
});

const InsertPage = () => {

    const route = useRouter();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting, isDirty, isValid },
    } = useForm<FormValues>({
        mode: "all",
        resolver: zodResolver(formSchema),
    });
    const saveData = (formValues: FormValues) => {

        let data: Vehicle = {
            bicycle: formValues.bicycle,
            color: formValues.color,
            fuel: formValues.fuel,
            manufacturer: formValues.manufacturer,
            model: formValues.model,
            type: formValues.type,
            vehicle: formValues.vehicle,
            vin: formValues.vin,
            vrm: formValues.vrm
        };

        fetch(`/api/vehicle/insert`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then(() => {
                route.push('/');
            })
    }

    return <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-3xl">
            <h1 className="text-3xl font-bold mb-4">Add car</h1>
            <form onSubmit={handleSubmit(saveData)}>
                <div className="relative">
                    <label htmlFor="bicycle" className="text-gray-700">Bicycle</label>
                    <br />
                    <input {...register("bicycle")} type="text" name="bicycle" id="bicycle" className="border border-slate-300 p-1 w-full" autoComplete="off" />
                    {errors?.bicycle && (
                        <p className="text-red-600 text-sm">
                            {errors?.bicycle?.message}
                        </p>
                    )}
                </div>
                <div className="relative mt-2">
                    <label htmlFor="color" className="text-gray-700">Color</label>
                    <br />
                    <input {...register("color")} type="text" name="color" id="color" className="border border-slate-300 p-1 w-full" autoComplete="off" />
                    {errors?.color && (
                        <p className="text-red-600 text-sm">
                            {errors?.color?.message}
                        </p>
                    )}
                </div>
                <div className="relative">
                    <label htmlFor="fuel" className="text-gray-700">Fuel</label>
                    <br />
                    <input {...register("fuel")} type="text" name="fuel" id="fuel" className="border border-slate-300 p-1 w-full" autoComplete="off" />
                    {errors?.fuel && (
                        <p className="text-red-600 text-sm">
                            {errors?.fuel?.message}
                        </p>
                    )}
                </div>
                <div className="relative mt-2">
                    <label htmlFor="manufacturer" className="text-gray-700">Manufacturer</label>
                    <br />
                    <input {...register("manufacturer")} type="text" name="manufacturer" id="manufacturer" className="border border-slate-300 p-1 w-full" autoComplete="off" />
                    {errors?.manufacturer && (
                        <p className="text-red-600 text-sm">
                            {errors?.manufacturer?.message}
                        </p>
                    )}
                </div>
                <div className="relative mt-2">
                    <label htmlFor="model" className="text-gray-700">Model</label>
                    <br />
                    <input {...register("model")} type="text" name="model" id="model" className="border border-slate-300 p-1 w-full" autoComplete="off" />
                    {errors?.model && (
                        <p className="text-red-600 text-sm">
                            {errors?.model?.message}
                        </p>
                    )}
                </div>
                <div className="relative">
                    <label htmlFor="type" className="text-gray-700">Type</label>
                    <br />
                    <input {...register("type")} type="text" name="type" id="type" className="border border-slate-300 p-1 w-full" autoComplete="off" />
                    {errors?.type && (
                        <p className="text-red-600 text-sm">
                            {errors?.type?.message}
                        </p>
                    )}
                </div>
                <div className="relative mt-2">
                    <label htmlFor="vehicle" className="text-gray-700">Vehicle</label>
                    <br />
                    <input {...register("vehicle")} type="text" name="vehicle" id="vehicle" className="border border-slate-300 p-1 w-full" autoComplete="off" />
                    {errors?.vehicle && (
                        <p className="text-red-600 text-sm">
                            {errors?.vehicle?.message}
                        </p>
                    )}
                </div>
                <div className="relative mt-2">
                    <label htmlFor="vin" className="text-gray-700">Vin</label>
                    <br />
                    <input {...register("vin")} type="text" name="vin" id="vin" className="border border-slate-300 p-1 w-full" autoComplete="off" />
                    {errors?.vin && (
                        <p className="text-red-600 text-sm">
                            {errors?.vin?.message}
                        </p>
                    )}
                </div>
                <div className="relative mt-2">
                    <label htmlFor="vrm" className="text-gray-700">Vrm</label>
                    <br />
                    <input {...register("vrm")} type="text" name="vrm" id="vrm" className="border border-slate-300 p-1 w-full" autoComplete="off" />
                    {errors?.vrm && (
                        <p className="text-red-600 text-sm">
                            {errors?.vrm?.message}
                        </p>
                    )}
                </div>
                <button type="submit" className="bg-blue-500 mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={!isDirty || !isValid || isSubmitting}>
                    {isSubmitting ? (
                        <div role="status">
                            <svg
                                aria-hidden="true"
                                className="inline w-6 h-6 mr-2 text-white animate-spin fill-rose-600 opacity-100"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                            </svg>
                        </div>
                    ) : (
                        "Send"
                    )}
                </button>
            </form>
        </div>
    </div>
}
export default InsertPage;