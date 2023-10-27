import { IFormValues } from "@/helpers/interfaces/form";
import React from "react";
import { useForm } from "react-hook-form";


interface IFormBlockProps {
    children: React.ReactNode,
    defaultValues?: IFormValues,
    onSubmit: any
}

export function FormBlock ({defaultValues, children, onSubmit}: IFormBlockProps) {
    const { handleSubmit, register } = useForm({ defaultValues });
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                {Array.isArray(children)
                  ? children.map((child) => {
                      return child.props.name
                        ? React.createElement(child.type, {
                            ...{
                              ...child.props,
                              register,
                              key: child.props.name
                            }
                          })
                        : child;
                    })
                  : children}
            </form>
        </>
    );
}