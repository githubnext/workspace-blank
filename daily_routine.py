import datetime

class DailyRoutine:
    def __init__(self):
        self.tasks = []
        self.time_blocks = []
        self.breaks = []
        self.creative_time = []
        self.review_time = []

    def add_task(self, task, priority, deadline):
        self.tasks.append({"task": task, "priority": priority, "deadline": deadline})

    def allocate_time_block(self, start_time, end_time, task):
        self.time_blocks.append({"start_time": start_time, "end_time": end_time, "task": task})

    def add_break(self, start_time, end_time):
        self.breaks.append({"start_time": start_time, "end_time": end_time})

    def add_creative_time(self, start_time, end_time):
        self.creative_time.append({"start_time": start_time, "end_time": end_time})

    def add_review_time(self, start_time, end_time):
        self.review_time.append({"start_time": start_time, "end_time": end_time})

    def prioritize_tasks(self):
        self.tasks.sort(key=lambda x: (x["priority"], x["deadline"]))

    def break_down_task(self, task, sub_tasks):
        for t in self.tasks:
            if t["task"] == task:
                t["sub_tasks"] = sub_tasks

    def review_and_adjust(self):
        # Placeholder for review and adjustment logic
        pass

    def minimize_distractions(self):
        # Placeholder for minimizing distractions logic
        pass

    def display_routine(self):
        print("Daily Routine:")
        for block in self.time_blocks:
            print(f"{block['start_time']} - {block['end_time']}: {block['task']}")
        for brk in self.breaks:
            print(f"Break: {brk['start_time']} - {brk['end_time']}")
        for creative in self.creative_time:
            print(f"Creative Time: {creative['start_time']} - {creative['end_time']}")
        for review in self.review_time:
            print(f"Review Time: {review['start_time']} - {review['end_time']}")

# Example usage
routine = DailyRoutine()
routine.add_task("Create Lovelanguage.code", 1, datetime.date(2023, 12, 31))
routine.add_task("Work on other project", 2, datetime.date(2023, 12, 31))
routine.allocate_time_block("09:00", "12:00", "Create Lovelanguage.code")
routine.add_break("12:00", "13:00")
routine.allocate_time_block("13:00", "17:00", "Work on other project")
routine.add_creative_time("17:00", "18:00")
routine.add_review_time("18:00", "19:00")
routine.prioritize_tasks()
routine.display_routine()
