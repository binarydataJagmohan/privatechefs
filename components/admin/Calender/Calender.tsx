import React, { useState, useEffect } from 'react';
import { getAdminCalenderBookings } from '../../../lib/adminapi';
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import { Calendar, momentLocalizer, Event } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export default function CalendarComponent() {
	interface MyBooking {
		dates: string;
		name: string;
		pic: string;
	}

	const [getbooking, setGetBookings] = useState<MyBooking[]>([]);

	useEffect(() => {
		const data = isPageVisibleToRole("admin-calender");
		if (data == 2) {
			window.location.href = "/login";
		} else if (data == 0) {
			window.location.href = "/404";
		}
		if (data === 1) {
			fetchBookingAdminDetails();
		}
	}, []);

	const fetchBookingAdminDetails = async () => {
		try {
			const res = await getAdminCalenderBookings();
			if (res.status) {
				setGetBookings(res.bookings);
				console.log(res.bookings);
			}
		} catch (err: any) {
			console.log('error');
		}
	};

	const formatEvents = () => {
		const events: any = [];
		let currentEvent: any = null;

		getbooking.forEach((booking) => {
			const dates = booking.dates.split(',');

			dates.forEach((date: any, index: any) => {
				const eventDate = new Date(date);
				const nextDate = dates[index + 1] ? new Date(dates[index + 1]) : null;

				if (currentEvent && currentEvent.user.name === booking.name) {
					if (nextDate && isConsecutiveDates(eventDate, nextDate)) {
						currentEvent.end = nextDate;
					} else {
						events.push(currentEvent);
						currentEvent = null;
					}
				} else {
					const event = {
						start: eventDate,
						end: eventDate,
						user: {
							name: booking.name,
							pic: booking.pic,
						},
					};

					if (nextDate && isConsecutiveDates(eventDate, nextDate)) {
						currentEvent = event;
					} else {
						events.push(event);
					}
				}
			});
		});

		return events;
	};

	const isConsecutiveDates = (date1: any, date2: any) => {
		const oneDay = 24 * 60 * 60 * 1000;
		const diff = Math.abs(date1 - date2);
		return diff === oneDay;
	};

	return (
		<>
			<div className="table-part">
				<h2>Calendar</h2>
				<Calendar
					localizer={localizer}
					events={formatEvents()}
					startAccessor="start"
					endAccessor="end"
					style={{ height: '500px' }}
					components={{
						event: ({ event }: { event: Event }) => (
							<div>
								{event.user.pic ? (
									<img
										src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chef/users/' + event.user.pic}
										alt="User"
										style={{ maxWidth: '15px', borderRadius: '50%' }}
									/>
								) : (
									<img
										src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chef/users/users.jpg'}
										alt="User"
										style={{ maxWidth: '15px', borderRadius: '50%' }}
									/>
								)}
								<span style={{ marginLeft: '10px', fontSize: '10px' }}>{event.user.name}</span>
							</div>
						),
					}}
				/>
			</div>
		</>
	);
}
