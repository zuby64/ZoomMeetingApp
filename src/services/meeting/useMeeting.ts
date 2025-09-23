import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MeetingService } from './meeting.methods';
import { 
  JoinMeetingRequest, 
  CreateMeetingRequest, 
  LeaveMeetingRequest,
  MeetingDetails 
} from './meeting.interface';

// Query Keys
export const meetingKeys = {
  all: ['meetings'] as const,
  details: (id: string) => [...meetingKeys.all, 'details', id] as const,
  history: () => [...meetingKeys.all, 'history'] as const,
  upcoming: () => [...meetingKeys.all, 'upcoming'] as const,
  current: () => [...meetingKeys.all, 'current'] as const,
};

/**
 * Hook for joining a meeting
 */
export const useJoinMeeting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: JoinMeetingRequest) => MeetingService.joinMeeting(request),
    onSuccess: (data) => {
      // Set current meeting in cache
      queryClient.setQueryData(meetingKeys.current(), data);
      
      // Invalidate meeting details
      queryClient.invalidateQueries({ queryKey: meetingKeys.details(data.meetingId) });
    },
    onError: (error) => {
      console.error('Join meeting error:', error);
    },
  });
};

/**
 * Hook for creating a meeting
 */
export const useCreateMeeting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CreateMeetingRequest) => MeetingService.createMeeting(request),
    onSuccess: (data) => {
      // Set current meeting in cache
      queryClient.setQueryData(meetingKeys.current(), data);
      
      // Invalidate upcoming meetings
      queryClient.invalidateQueries({ queryKey: meetingKeys.upcoming() });
    },
    onError: (error) => {
      console.error('Create meeting error:', error);
    },
  });
};

/**
 * Hook for leaving a meeting
 */
export const useLeaveMeeting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: LeaveMeetingRequest) => MeetingService.leaveMeeting(request),
    onSuccess: () => {
      // Clear current meeting from cache
      queryClient.removeQueries({ queryKey: meetingKeys.current() });
      
      // Invalidate meeting history
      queryClient.invalidateQueries({ queryKey: meetingKeys.history() });
    },
    onError: (error) => {
      console.error('Leave meeting error:', error);
    },
  });
};

/**
 * Hook for ending a meeting (host only)
 */
export const useEndMeeting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (meetingId: string) => MeetingService.endMeeting(meetingId),
    onSuccess: () => {
      // Clear current meeting from cache
      queryClient.removeQueries({ queryKey: meetingKeys.current() });
      
      // Invalidate meeting history
      queryClient.invalidateQueries({ queryKey: meetingKeys.history() });
    },
    onError: (error) => {
      console.error('End meeting error:', error);
    },
  });
};

/**
 * Hook to get meeting details
 */
export const useMeetingDetails = (meetingId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: meetingKeys.details(meetingId),
    queryFn: () => MeetingService.getMeetingDetails(meetingId),
    enabled: enabled && !!meetingId,
    staleTime: 30 * 1000, // 30 seconds
    retry: 1,
  });
};

/**
 * Hook to get meeting history
 */
export const useMeetingHistory = () => {
  return useQuery({
    queryKey: meetingKeys.history(),
    queryFn: () => MeetingService.getMeetingHistory(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};

/**
 * Hook to get upcoming meetings
 */
export const useUpcomingMeetings = () => {
  return useQuery({
    queryKey: meetingKeys.upcoming(),
    queryFn: () => MeetingService.getUpcomingMeetings(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 1,
  });
};

/**
 * Hook to get current meeting
 */
export const useCurrentMeeting = () => {
  return useQuery({
    queryKey: meetingKeys.current(),
    queryFn: () => {
      // This would typically get the current meeting from a global state
      // For now, we'll return null
      return null as MeetingDetails | null;
    },
    staleTime: 10 * 1000, // 10 seconds
  });
};

/**
 * Hook to update meeting settings
 */
export const useUpdateMeetingSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ 
      meetingId, 
      settings 
    }: { 
      meetingId: string; 
      settings: Partial<CreateMeetingRequest['settings']> 
    }) => MeetingService.updateMeetingSettings(meetingId, settings),
    onSuccess: (_, { meetingId }) => {
      // Invalidate meeting details
      queryClient.invalidateQueries({ queryKey: meetingKeys.details(meetingId) });
    },
    onError: (error) => {
      console.error('Update meeting settings error:', error);
    },
  });
};
