
import com.example.attendance.entity.AttendanceRecord;
import com.example.attendance.entity.Staff;
import com.example.attendance.repository.AttendanceRecordRepository;
import com.example.attendance.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class AttendanceController {

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private AttendanceRecordRepository attendanceRepository;

    // API to mark attendance
    @PostMapping("/attendance/mark")
    public AttendanceRecord markAttendance(@RequestBody AttendanceRequest request) {
        Staff staff = staffRepository.findById(request.getStaffId())
                .orElseThrow(() -> new RuntimeException("Staff not found"));

        AttendanceRecord record = new AttendanceRecord();
        record.setStaff(staff);
        record.setDate(LocalDate.now());
        record.setTime(LocalTime.now());
        record.setStatus("Present");

        return attendanceRepository.save(record);
    }

    // API to get all attendance records
    @GetMapping("/attendance/list")
    public Iterable<AttendanceRecord> getAllAttendance() {
        return attendanceRepository.findAll();
    }
}

// DTO class for attendance request
class AttendanceRequest {
    private Long staffId;

    public Long getStaffId() {
        return staffId;
    }

    public void setStaffId(Long staffId) {
        this.staffId = staffId;
    }
}
