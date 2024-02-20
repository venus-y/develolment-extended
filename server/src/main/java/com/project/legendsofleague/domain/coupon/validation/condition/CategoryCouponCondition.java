package com.project.legendsofleague.domain.coupon.validation.condition;

import com.project.legendsofleague.domain.coupon.domain.Coupon;
import com.project.legendsofleague.domain.item.domain.Item;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@NoArgsConstructor
@Component
public class CategoryCouponCondition implements CouponValidationCondition {

    @Override
    public Boolean checkValidation(Coupon coupon, Item item, Integer price, Integer quantity) {
        return coupon.getAppliedCategory().equals(item.getCategory());
    }
}
