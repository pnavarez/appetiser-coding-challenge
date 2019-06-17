<template>
    <div class="calendar">
        <div class="row">
            <div class="col-md">
                <form @submit.prevent="onSubmit($event)">
                    <div class="form-group">
                        <label for="event_title">Event</label>
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Title"
                            id="event_title"
                            v-model="event.title"
                            required
                        />
                    </div>
                    <div class="d-flex justify-content-between flex-fill">
                        <div class="form-group flex-grow-1 mr-3">
                            <label for="event_from">From</label>
                            <date-picker id="event_from" v-model="event.from" :config="options" required></date-picker>
                        </div>
                        <div class="form-group flex-grow-1">
                            <label for="event_to">To</label>
                            <date-picker id="event_to" v-model="event.to" :config="options" required></date-picker>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="days_mon" v-model="event.days.mon">
                            <label class="form-check-label" for="days_mon">Mon</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="days_tue" v-model="event.days.tue">
                            <label class="form-check-label" for="days_tue">Tue</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="days_wed" v-model="event.days.wed">
                            <label class="form-check-label" for="days_wed">Wed</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="days_thu" v-model="event.days.thu">
                            <label class="form-check-label" for="days_thu">Thu</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="days_fri" v-model="event.days.fri">
                            <label class="form-check-label" for="days_fri">Fri</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="days_sat" v-model="event.days.sat">
                            <label class="form-check-label" for="days_sat">Sat</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="days_sun" v-model="event.days.sun">
                            <label class="form-check-label" for="days_sun">Sun</label>
                        </div>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary" type="submit">Save</button>
                    </div>
                </form>
            </div>
            <div class="col-md">
                <FullCalendar
                    ref="fullCalendar"
                    defaultView="listMonth"
                    :plugins="calendarPlugins"
                    :events="eventsData"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import events from '../api/events';
    import FullCalendar from '@fullcalendar/vue'
    import listPlugin from '@fullcalendar/list';
    import datePicker from 'vue-bootstrap-datetimepicker';
    import moment from 'moment';

    export default {
        name: "Calendar",
        components: {
            FullCalendar,
            datePicker
        },
        data() {
            return {
                calendarPlugins: [
                    listPlugin
                ],
                eventsData: [],
                event: {
                    title: '',
                    from: '',
                    to: '',
                    days: {
                        mon: false,
                        tue: false,
                        wed: false,
                        thu: false,
                        fri: false,
                        sat: false,
                        sun: false
                    },
                },
                date: new Date(),
                options: {
                    format: 'YYYY-MM-DD',
                    useCurrent: true,
                }
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            fetchData() {
                events.all().then(response => {
                    this.eventsData = response.data.data;
                });
            },
            onSubmit(event) {
                const from = moment(this.event.from).format('YYYY-MM-DD');
                const to = moment(this.event.to).format('YYYY-MM-DD');

                let runningDate = from;
                let dayArr = [];
                let days = [];

                days['sun'] = 0;
                days['mon'] = 1;
                days['tue'] = 2;
                days['wed'] = 3;
                days['thu'] = 4;
                days['fri'] = 5;
                days['sat'] = 6;

                for(const day in this.event.days) {
                    if (this.event.days[day]) dayArr.push(days[day]);
                }

                events.deleteAll();

                while (runningDate >= from && runningDate <= to) {
                    if (dayArr.includes(moment(runningDate).day())) {
                        events.add({
                            title: this.event.title,
                            date: runningDate
                        });
                    }

                    runningDate = moment(runningDate).add(1, 'days').format('YYYY-MM-DD');
                }

                this.fetchData();
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@fullcalendar/core/main.css';
    @import '~@fullcalendar/list/main.css';
    @import '~pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';

    .fc-scroller {
        height: 100% !important;
    }
</style>