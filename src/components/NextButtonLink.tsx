import React, { forwardRef, Ref } from "react";
import Link, { LinkProps } from "next/link";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";

type LinkRef = HTMLAnchorElement;
type NextButtonProps = Omit<MuiButtonProps, "href" | "classes"> &
  Pick<LinkProps, "href" | "as" | "prefetch">;

const NextButtonModify = (
  { href, as, prefetch, ...props }: NextButtonProps,
  ref: Ref<LinkRef>
) => (
  <Link href={href} as={as} prefetch={prefetch} passHref legacyBehavior>
    <MuiButton href={`${href}`} {...props} />
  </Link>
);

export const NextButtonLink = forwardRef<LinkRef, NextButtonProps>(
  NextButtonModify
);
