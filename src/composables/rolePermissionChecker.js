import { computed } from 'vue';
import {useAuthStore} from "../../stores/useAuthStore";
export function useRolePermissionChecker() {
    const store = useAuthStore()
    const roles = computed(() => store.userRoles);
    const permissions = computed(() => store.userPermissions);
    function hasRole(roleName) {
        return roles.value.includes(roleName);
    }
    function hasPermission(permissionName) {
        return permissions.value.includes(permissionName);
    }

    return {
        hasRole,
        hasPermission,
    };
}
