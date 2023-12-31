"use client";

import React, { useCallback, useMemo } from "react";

import { SafeReservation, SafeUser } from "@/types";
import { useRouter } from "next/navigation";
import { useCountires } from "@/app/hooks/useCountries";
import Image from "next/image";
import { SafeListing } from "@/types";
import HeartButton from "../HeartButton";
import Button from "../Button"
interface ListingCardProps {
  data: SafeListing;
  currentUser: SafeUser | null;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  currentUser,
  reservation,
  onAction,
  disabled,
  actionId = "",
  actionLabel,
}) => {
  const router = useRouter();
  const { getByValue } = useCountires();
  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }
      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    const startFormatted = start.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const endFormatted = end.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    return `${startFormatted} -${endFormatted}`;
  }, [reservation]);
  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="  col-span-1 cursor-pointer group"
    >
      <div className=" flex flex-col gap-2 w-full">
        <div
          className="
           aspect-square
           w-full
           relative
           overflow-hidden
           rounded-xl
          "
        >
          <Image
            fill
            alt="listing"
            src={data.imageSrc}
            className="
            object-cover
            h-full
            w-full
            group-hover:scale-110
            transition
           "
          />
          <div className=" absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className=" font-semibold text-lg">
          {location?.region},{location?.label}
        </div>
        <div className=" font-light text-neutral-500">
          {reservationDate || data.category}
        </div>

        <div className="flex flex-row items-center gap-1">
          <div className=" font-semibold">${price}</div>
          {!reservation && <div className=" font-light"> night</div>}
          {onAction && actionLabel && (
            <Button
              disabled={disabled}
              small
              label={actionLabel}
              onClick={handleCancel}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
