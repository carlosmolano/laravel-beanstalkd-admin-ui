new Vue({
    el: '#app',

    data: {
        tubeStats: {
            'current-watching': 0,
            'current-jobs-ready': 0,
            'current-jobs-reserved': 0,
            'current-jobs-delayed': 0,
            'total-jobs': 0,
            'cmd-delete': 0,
        },

        nextReady: null,
        nextDelayed: null,
        nextBuried: null
    },

    props: {
        tube: {
            type: String,
            required: true
        }
    },

    methods: {
        fetchData: function () {
            $.get('/api/tube/' + this.tube, function (response) {
                this.tubeStats = response.tubeStats
                this.nextReady = response.nextReady
                this.nextBuried = response.nextBuried
                this.nextDelayed = response.nextDelayed
            }.bind(this));
        }
    },

    ready: function () {
        this.fetchData();

        setInterval(function () {
            this.fetchData();
        }.bind(this), 2000);
    }
})